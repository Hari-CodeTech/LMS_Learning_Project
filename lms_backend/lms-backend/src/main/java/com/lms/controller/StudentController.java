package com.lms.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import com.lms.dto.LoginRequest;
import com.lms.dto.LoginResponse;
import com.lms.entity.Student;
import com.lms.service.StudentService;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    // Register Student
    @PostMapping("/register")
    public ResponseEntity<Student> registerStudent(
            @Valid @RequestBody Student student) {

        Student savedStudent =
                studentService.registerStudent(student);

        return new ResponseEntity<>(
                savedStudent, HttpStatus.CREATED);
    }

    // Get All Students - Admin Only
    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents() {

        List<Student> students =
                studentService.getAllStudents();

        return ResponseEntity.ok(students);
    }

    // Get Student By ID - Admin Only
    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(
            @PathVariable Long id) {

        Student student =
                studentService.getStudentById(id);

        if (student == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(student);
    }

    // Update Student - Admin Only
    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(
            @PathVariable Long id,
            @Valid @RequestBody Student student) {

        Student updatedStudent =
                studentService.updateStudent(id, student);

        if (updatedStudent == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(updatedStudent);
    }

    // Delete Student - Admin Only
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStudent(
            @PathVariable Long id) {

        boolean deleted =
                studentService.deleteStudent(id);

        if (!deleted) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(
                "Student deleted successfully");
    }

    // Student/Admin Login
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> loginStudent(
            @Valid @RequestBody LoginRequest loginRequest) {

        LoginResponse response =
                studentService.loginStudent(loginRequest);

        return ResponseEntity.ok(response);
    }

    // Get Logged-in User Profile
    @GetMapping("/profile")
    public ResponseEntity<Student> getStudentProfile(
            Authentication authentication) {

        String email = authentication.getName();

        Student student =
                studentService.getStudentProfile(email);

        if (student == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(student);
    }
}