package com.lms.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.lms.entity.Student;
import com.lms.enums.Role;
import com.lms.repository.StudentRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

@Component
public class AdminInitializer implements CommandLineRunner {

    private final StudentRepository studentRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.admin.email}")
    private String adminEmail;

    @Value("${app.admin.password}")
    private String adminPassword;

    public AdminInitializer(StudentRepository studentRepository,
                            PasswordEncoder passwordEncoder) {
        this.studentRepository = studentRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {

        if (!studentRepository.existsByEmail(adminEmail)) {

            Student admin = new Student();

            admin.setName("LMS Admin");
            admin.setEmail(adminEmail);
            admin.setPassword(passwordEncoder.encode(adminPassword));
            admin.setPhone("9999999999");
            admin.setRole(Role.ADMIN);

            studentRepository.save(admin);

            System.out.println("Initial Admin account created.");
        }
    }
}