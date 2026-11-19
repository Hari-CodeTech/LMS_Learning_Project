
package com.lms.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter) {

        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    // CORS Configuration
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(
            List.of("http://localhost:5173")
        );

        configuration.setAllowedMethods(
            List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")
        );

        configuration.setAllowedHeaders(
            List.of("Authorization", "Content-Type")
        );

        configuration.setAllowCredentials(false);

        UrlBasedCorsConfigurationSource source =
            new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        http
            // Enable CORS
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))

            // Disable CSRF
            .csrf(csrf -> csrf.disable())

            // Stateless session management
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            // Authorization rules
            .authorizeHttpRequests(auth -> auth

                // Public endpoints
                .requestMatchers(
                    "/api/students/register",
                    "/api/students/login"
                ).permitAll()

                // Student and Admin profile
                .requestMatchers("/api/students/profile")
                .hasAnyRole("STUDENT", "ADMIN")

                // Students and Admins can view courses
                .requestMatchers(
                    HttpMethod.GET,
                    "/api/courses/**"
                ).hasAnyRole("STUDENT", "ADMIN")

                // Only Admin can manage courses
                .requestMatchers("/api/courses/**")
                .hasRole("ADMIN")

                // Only Admin can manage student records
                .requestMatchers("/api/students/**")
                .hasRole("ADMIN")

                // Student can view own enrollments
                .requestMatchers("/api/enrollments/my-courses")
                .hasRole("STUDENT")

                // Student can enroll in courses
                .requestMatchers(HttpMethod.POST, "/api/enrollments/**")
                .hasRole("STUDENT")

                // Admin can view all enrollments
                .requestMatchers(HttpMethod.GET, "/api/enrollments")
                .hasRole("ADMIN")

                // Remaining endpoints
                .anyRequest().authenticated()
            )

            // Disable default authentication
            .httpBasic(basic -> basic.disable())
            .formLogin(form -> form.disable())

            // JWT filter
            .addFilterBefore(
                jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }
}
