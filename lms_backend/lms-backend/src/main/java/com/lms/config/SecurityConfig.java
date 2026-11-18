package com.lms.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter) {

        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        http
            .csrf(csrf -> csrf.disable())

            .sessionManagement(session -> session
                .sessionCreationPolicy(
                    SessionCreationPolicy.STATELESS)
            )

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

                // All remaining endpoints
                .anyRequest().authenticated()
            )

            .httpBasic(basic -> basic.disable())

            .formLogin(form -> form.disable())

            .addFilterBefore(
                jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }
}