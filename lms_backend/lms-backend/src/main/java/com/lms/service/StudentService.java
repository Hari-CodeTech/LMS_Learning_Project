package com.lms.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.lms.dto.LoginRequest;
import com.lms.dto.LoginResponse;
import com.lms.entity.Student;
import com.lms.enums.Role;
import com.lms.exception.EmailAlreadyExistsException;
import com.lms.exception.InvalidCredentialsException;
import com.lms.repository.StudentRepository;

@Service
public class StudentService {

    private final StudentRepository studentRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public StudentService(
            StudentRepository studentRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {

        this.studentRepository = studentRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    // Student Registration
    public Student registerStudent(Student student) {

        if (studentRepository.existsByEmail(student.getEmail())) {
            throw new EmailAlreadyExistsException(
                    "Email is already registered");
        }

        student.setRole(Role.STUDENT);

        student.setPassword(
                passwordEncoder.encode(student.getPassword()));

        return studentRepository.save(student);
    }

    // Get All Students
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // Get Student By ID
    public Student getStudentById(Long id) {
        return studentRepository.findById(id).orElse(null);
    }

    // Update Student
    public Student updateStudent(Long id, Student updatedStudent) {

        Student existingStudent =
                studentRepository.findById(id).orElse(null);

        if (existingStudent == null) {
            return null;
        }

        existingStudent.setName(updatedStudent.getName());
        existingStudent.setEmail(updatedStudent.getEmail());
        existingStudent.setPhone(updatedStudent.getPhone());

        return studentRepository.save(existingStudent);
    }

    // Delete Student
    public boolean deleteStudent(Long id) {

        if (!studentRepository.existsById(id)) {
            return false;
        }

        studentRepository.deleteById(id);
        return true;
    }

    // Student/Admin Login
    public LoginResponse loginStudent(LoginRequest loginRequest) {

        Student student =
                studentRepository.findByEmail(loginRequest.getEmail());

        if (student == null) {
            throw new InvalidCredentialsException(
                    "Invalid email or password");
        }

        boolean passwordMatches = passwordEncoder.matches(
                loginRequest.getPassword(),
                student.getPassword());

        if (!passwordMatches) {
            throw new InvalidCredentialsException(
                    "Invalid email or password");
        }

        String token = jwtService.generateToken(student);

        return new LoginResponse(
                student.getId(),
                student.getName(),
                student.getEmail(),
                "Login successful",
                student.getRole(),
                token
        );
    }

    // Get Logged-in User Profile
    public Student getStudentProfile(String email) {

        return studentRepository.findByEmail(email);
    }
}