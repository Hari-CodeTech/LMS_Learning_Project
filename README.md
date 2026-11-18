# LMS Portal – Learning Management System

## 1. Project Overview

The **Learning Management System (LMS)** is a web-based application designed to manage students and online courses.

The application provides two types of users:

- **Admin:** Manages courses and student records.
- **Student:** Registers, logs in, views available courses, and enrolls in courses.

The main objective is to simplify course management and provide students with an organized learning platform.

---

## 2. Technology Stack

### Backend
- Java 21
- Spring Boot 4.1.2
- Spring Data JPA
- Spring Security
- JWT Authentication
- Maven

### Frontend
- React.js
- JavaScript
- Bootstrap
- CSS

### Database
- MySQL

### API Testing
- Postman

---

## 3. System Architecture

The application follows a **three-tier architecture**.

```text
             USER
               |
               v
       REACT FRONTEND
               |
          REST APIs
               |
               v
      SPRING BOOT BACKEND
               |
       -------------------
       |        |        |
       v        v        v
    Student   Course  Enrollment
    Module    Module    Module
       |        |        |
       -------------------
               |
               v
          MYSQL DATABASE
```

### Architecture Explanation

**1. Presentation Layer – React**

- Displays the user interface.
- Provides registration and login forms.
- Displays student and admin dashboards.
- Communicates with the backend through REST APIs.

**2. Business Logic Layer – Spring Boot**

- Handles incoming API requests.
- Processes business logic.
- Validates user input.
- Handles authentication and authorization.
- Communicates with the database using Spring Data JPA.

**3. Data Layer – MySQL**

- Stores student information.
- Stores admin information.
- Stores course information.
- Stores enrollment information.

---

## 4. Project Flow

### A. Student Registration Flow

```text
Student
   |
   v
Registration Page
   |
   v
Enter Student Details
   |
   v
React Sends POST Request
   |
   v
StudentController
   |
   v
StudentService
   |
   v
Password Encryption (BCrypt)
   |
   v
StudentRepository
   |
   v
MySQL Database
   |
   v
Registration Successful
```

Important:
- Only students can register.
- Passwords are encrypted using BCrypt.
- Student role is assigned automatically.
- Duplicate email registration is prevented.

### B. Login Flow

Both Admin and Student use the same login API.

```text
          LOGIN PAGE
               |
               v
       Enter Email & Password
               |
               v
       POST /api/students/login
               |
               v
        StudentController
               |
               v
         StudentService
               |
               v
       Check Database Records
               |
               v
       Verify Password (BCrypt)
               |
               v
        Generate JWT Token
               |
               v
        Return Login Response
               |
          ------------
          |          |
          v          v
        ADMIN      STUDENT
          |          |
          v          v
     Admin Panel  Student Panel
```

The user's role is retrieved from the database.

### C. JWT Authentication Flow

```text
User Login
    |
    v
JWT Token Generated
    |
    v
React Stores Token
    |
    v
User Requests Protected API
    |
    v
Authorization Header
    |
    v
JwtAuthenticationFilter
    |
    v
Validate JWT Token
    |
    v
Load User Details
    |
    v
Check User Role
    |
    v
Allow or Deny Request
```

Example Authorization Header:

```http
Authorization: Bearer <JWT_TOKEN>
```

### D. Course Management Flow

Only Admin can add, update and delete courses.

Students and Admins can view available courses.

```text
             ADMIN
               |
               v
         Course Management
               |
       -------------------
       |        |        |
       v        v        v
      Add    Update    Delete
       |        |        |
       -------------------
               |
               v
        CourseController
               |
               v
          CourseService
               |
               v
        CourseRepository
               |
               v
          MySQL Database
```

Student course viewing:

```text
Student Login
     |
     v
View Available Courses
     |
     v
GET /api/courses
     |
     v
CourseController
     |
     v
CourseService
     |
     v
CourseRepository
     |
     v
MySQL Database
     |
     v
Display Courses
```

---

## 5. Backend Project Structure

```text
lms-backend
│
├── src/main/java/com/lms
│   │
│   ├── config
│   │   ├── SecurityConfig.java
│   │   ├── PasswordConfig.java
│   │   ├── JwtAuthenticationFilter.java
│   │   └── AdminInitializer.java
│   │
│   ├── controller
│   │   ├── StudentController.java
│   │   └── CourseController.java
│   │
│   ├── dto
│   │   ├── LoginRequest.java
│   │   └── LoginResponse.java
│   │
│   ├── entity
│   │   ├── Student.java
│   │   └── Course.java
│   │
│   ├── enums
│   │   └── Role.java
│   │
│   ├── exception
│   │   ├── GlobalExceptionHandler.java
│   │   ├── EmailAlreadyExistsException.java
│   │   └── InvalidCredentialsException.java
│   │
│   ├── repository
│   │   ├── StudentRepository.java
│   │   └── CourseRepository.java
│   │
│   ├── service
│   │   ├── StudentService.java
│   │   ├── CourseService.java
│   │   ├── JwtService.java
│   │   └── CustomUserDetailsService.java
│   │
│   └── LmsBackendApplication.java
│
└── src/main/resources
    └── application.properties
```

*Note: Enrollment-related classes will be added in the next development phase.*

---

## 6. Database Design

The application uses MySQL database:

```sql
CREATE DATABASE lms_db;
```

### Current Tables

**1. Students**

| Column | Description |
|---|---|
| id | Student ID |
| name | Student Name |
| email | Student Email |
| password | Encrypted Password |
| phone | Phone Number |
| role | STUDENT / ADMIN |

**2. Courses**

| Column | Description |
|---|---|
| id | Course ID |
| title | Course Title |
| description | Course Description |
| duration | Course Duration |

### Upcoming Table

**3. Enrollments**

| Column | Description |
|---|---|
| id | Enrollment ID |
| student_id | Student Reference |
| course_id | Course Reference |
| enrollment_date | Enrollment Date |

Planned relationships:

```text
STUDENT (1) -------- (*) ENROLLMENT

COURSE  (1) -------- (*) ENROLLMENT
```

A student can enroll in multiple courses, and a course can have multiple students.

---

## 7. REST API Endpoints

### Student APIs

| Method | Endpoint | Access |
|---|---|---|
| POST | /api/students/register | Public |
| POST | /api/students/login | Public |
| GET | /api/students/profile | Student / Admin |
| GET | /api/students | Admin |
| GET | /api/students/{id} | Admin |
| PUT | /api/students/{id} | Admin |
| DELETE | /api/students/{id} | Admin |

### Course APIs

| Method | Endpoint | Access |
|---|---|---|
| POST | /api/courses | Admin |
| GET | /api/courses | Student / Admin |
| GET | /api/courses/{id} | Student / Admin |
| PUT | /api/courses/{id} | Admin |
| DELETE | /api/courses/{id} | Admin |

### Upcoming Enrollment APIs

| Method | Endpoint | Access |
|---|---|---|
| POST | /api/enrollments | Student |
| GET | /api/enrollments/my-courses | Student |
| GET | /api/enrollments | Admin |

---

## 8. Security Implementation

The project uses Spring Security and JWT authentication.

Implemented security features:

- BCrypt password encryption.
- JWT-based authentication.
- Role-based authorization.
- Public student registration.
- Shared login for Admin and Student.
- Admin-only course management.
- Student and Admin course viewing.

### Role-Based Access

| Feature | Student | Admin |
|---|---|---|
| Register | Yes | No |
| Login | Yes | Yes |
| View Profile | Yes | Yes |
| View Courses | Yes | Yes |
| Add Courses | No | Yes |
| Update Courses | No | Yes |
| Delete Courses | No | Yes |
| Enroll in Courses | Yes | No |

---

## 9. How to Run the Backend

### Step 1: Clone the Repository

```bash
git clone <your-repository-url>
```

### Step 2: Open the Backend Directory

```bash
cd lms-backend
```

### Step 3: Configure MySQL

Update `application.properties` with your MySQL username and password.

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/lms_db
spring.datasource.username=root
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

server.port=8080
```

Configure your JWT secret separately. Never commit real credentials or JWT secrets to GitHub.

### Step 4: Run the Application

Windows:

```powershell
.\mvnw spring-boot:run
```

### Step 5: Test APIs

Open Postman and use:

```text
http://localhost:8080
```

---

## 10. Development Progress

### Completed

- [x] Spring Boot project setup
- [x] MySQL database connection
- [x] Student registration
- [x] BCrypt password encryption
- [x] Student and Admin login
- [x] JWT authentication
- [x] Role-based authorization
- [x] Student profile API
- [x] Course creation
- [x] Course retrieval
- [x] Course update and deletion implementation
- [x] Successful course creation and retrieval testing

### Upcoming

- [ ] Student Enrollment module
- [ ] View enrolled courses
- [ ] Admin enrollment management
- [ ] React login and registration integration
- [ ] Student Dashboard
- [ ] Admin Dashboard
- [ ] Complete frontend-backend integration

---

## 11. Future Scope

- Course progress tracking.
- Learning materials and document uploads.
- Student performance tracking.
- Course completion status.
- Admin analytics dashboard.

---

## 12. Project Objective

The main objective of this project is to understand and implement a full-stack web application using React, Spring Boot, Spring Security, JWT, Spring Data JPA and MySQL.

The project demonstrates REST API development, database integration, authentication, authorization and frontend-backend communication.
