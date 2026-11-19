package com.lms.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.lms.entity.Enrollment;
import com.lms.entity.Student;
import com.lms.repository.StudentRepository;
import com.lms.service.EnrollmentService;

@RestController
@RequestMapping("/api/enrollments")
public class EnrollmentController {

    private final EnrollmentService enrollmentService;
    private final StudentRepository studentRepository;

    public EnrollmentController(
            EnrollmentService enrollmentService,
            StudentRepository studentRepository) {

        this.enrollmentService = enrollmentService;
        this.studentRepository = studentRepository;
    }

    // Student enrolls in a course
    @PostMapping("/{courseId}")
    public ResponseEntity<Enrollment> enrollStudent(
            @PathVariable Long courseId,
            Authentication authentication) {

        Student student = studentRepository.findByEmail(
                authentication.getName());

        Enrollment enrollment = enrollmentService.enrollStudent(
                student.getId(), courseId);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(enrollment);
    }

    // Student views their enrolled courses
    @GetMapping("/my-courses")
    public ResponseEntity<List<Enrollment>> getMyCourses(
            Authentication authentication) {

        Student student = studentRepository.findByEmail(
                authentication.getName());

        return ResponseEntity.ok(
                enrollmentService.getStudentEnrollments(student.getId()));
    }

    // Admin views all enrollments
    @GetMapping
    public ResponseEntity<List<Enrollment>> getAllEnrollments() {

        return ResponseEntity.ok(
                enrollmentService.getAllEnrollments());
    }
}