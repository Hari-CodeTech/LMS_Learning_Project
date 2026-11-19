<!-- # LMS Portal – Learning Management System

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

The project demonstrates REST API development, database integration, authentication, authorization and frontend-backend communication. -->


<!-- This is Phase 2 Development  -->


# LMS Portal -- Learning Management System (LMS Portal V1.0)

A full-stack Learning Management System built with **React**, **Spring Boot**, **Spring Security**, **JWT**, and **MySQL**. The application provides separate Admin and Student experiences for managing courses, student accounts, and course enrollments.

## Live Application

- **Frontend:** https://kind-rebirth-production-3bd58cc2.up.railway.app
- **Backend base URL:** https://lmslearningproject-production.up.railway.app
- **GitHub repository:** https://github.com/Hari-CodeTech/LMS_Learning_Project

> The frontend URL is the main link for using the application. The backend URL is an API host; opening its root path in a browser may return `403` because the API is protected and does not provide a public home page.

---

## 1. Project Overview

The LMS Portal is designed to support two roles:

### Admin

- Log in to the Admin Dashboard.
- Create, view, update, and delete courses.
- View and manage student records.
- View enrollment information.

### Student

- Register for an account.
- Log in securely.
- View available courses.
- Enroll in courses.
- View their own enrolled courses.

The application uses a React frontend for the user interface, a Spring Boot REST API for application logic, and MySQL for persistent data storage.

## 2. Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, JavaScript |
| UI and styling | Bootstrap, CSS |
| HTTP communication | Axios |
| Backend | Java 21, Spring Boot 4.1.2 |
| REST API | Spring Web |
| Persistence | Spring Data JPA, Hibernate |
| Security | Spring Security, JWT |
| Password hashing | BCrypt |
| Database | MySQL |
| Build tool | Maven |
| API testing | Postman |
| Source control | Git and GitHub |
| Deployment | Railway |

---

## 3. Live System Architecture

```text
                  ADMIN / STUDENT
                         |
                         v
              React + Bootstrap Frontend
                         |
                         | Axios HTTP requests
                         | JSON + JWT Bearer token
                         v
                Spring Boot REST API
                         |
          +--------------+----------------+
          |              |                |
          v              v                v
   Student Module   Course Module   Enrollment Module
          |              |                |
          +--------------+----------------+
                         |
                         v
                 Spring Data JPA
                         |
                         v
                    Hibernate
                         |
                         v
                    MySQL DB
```

### Three main layers

1. **Presentation layer -- React**
   - Renders pages, forms, dashboards, and course information.
   - Collects user input.
   - Calls backend APIs through Axios.
   - Stores the JWT token after successful login and attaches it to protected requests.

2. **Application/business layer -- Spring Boot**
   - Receives HTTP requests through controllers.
   - Applies validation, business rules, and authorization.
   - Calls service and repository classes.
   - Returns JSON responses to the frontend.

3. **Data layer -- MySQL**
   - Stores user/student records, course records, and enrollment records.
   - Hibernate/JPA maps Java entity objects to database tables.

---

## 4. Repository Structure

The repository contains separate frontend and backend applications:

```text
LMS_Learning_Project/
|
|-- lms/                              # React frontend
|   |-- package.json                 # Frontend dependencies and scripts
|   |-- vite.config.js               # Vite development/preview configuration
|   |-- index.html                   # Browser entry HTML
|   |-- src/
|       |-- App.jsx                  # Main application routes
|       |-- ...                      # Pages, components, styles and API modules
|
|-- lms_backend/
    |-- lms-backend/
        |-- pom.xml                  # Maven dependencies and build configuration
        |-- mvnw                     # Maven wrapper for Unix-like systems
        |-- mvnw.cmd                 # Maven wrapper for Windows
        |-- src/
            |-- main/
                |-- java/com/lms/
                |   |-- config/
                |   |-- controller/
                |   |-- dto/
                |   |-- entity/
                |   |-- enums/
                |   |-- exception/
                |   |-- repository/
                |   |-- service/
                |   |-- LmsBackendApplication.java
                |
                |-- resources/
                    |-- application.properties
```

> This is a responsibility-oriented overview of the project structure. The exact component filenames inside the frontend `src` directory and any additional backend classes should be checked against the current repository before treating this as a complete file inventory.

---

## 5. Backend -- Package and File Responsibilities

Backend source root:

```text
lms_backend/lms-backend/src/main/java/com/lms/
```

### 5.1 Main application

**`LmsBackendApplication.java`**

- Entry point of the Spring Boot application.
- Contains the `main()` method.
- Starts the embedded web server and Spring application context.
- Component scanning discovers controllers, services, repositories, and configuration classes under the application package.

### 5.2 `config` package

Configuration classes define application-wide behavior.

| File | Responsibility |
|---|---|
| `SecurityConfig.java` | Configures Spring Security, public endpoints, protected endpoints, role-based access, stateless sessions, CORS, and JWT filter registration. |
| `PasswordConfig.java` | Provides password-encoding configuration, including the BCrypt encoder used for password hashing. |
| `JwtAuthenticationFilter.java` | Reads the Bearer token from incoming requests, validates it, and establishes the authenticated user in Spring Security's security context. |
| `AdminInitializer.java` | Creates the initial Admin account when it does not already exist, using the configured admin email and password. |

**Security request sequence**

```text
Incoming HTTP request
        |
        v
SecurityConfig filter chain
        |
        v
JwtAuthenticationFilter
        |
        v
Read Authorization: Bearer <token>
        |
        v
Validate token / identify user
        |
        v
Set authentication in SecurityContext
        |
        v
Apply endpoint authorization rules
        |
        v
Controller (if access is allowed)
```

Registration and login are configured as public endpoints. Other endpoints are subject to authentication and role checks.

### 5.3 `controller` package

Controllers expose REST endpoints. They receive HTTP requests, read request data, call the relevant service, and return HTTP responses.

| File | Responsibility |
|---|---|
| `StudentController.java` | Exposes student registration, login, profile, and student-management endpoints. |
| `CourseController.java` | Exposes course creation, listing, single-course retrieval, updating, and deletion endpoints. |
| Enrollment controller | Handles enrollment-related HTTP requests, such as enrolling a student and retrieving enrollment data. Check the actual class name in the repository. |

**Important:** Controllers should coordinate requests; business rules should be handled in service classes rather than putting all application logic in controller methods.

### 5.4 `dto` package

DTO means **Data Transfer Object**. DTOs define the data exchanged between the frontend and backend.

| File | Responsibility |
|---|---|
| `LoginRequest.java` | Carries login input, such as email and password, from the client. |
| `LoginResponse.java` | Carries the login result back to the client, including the authentication token and relevant user information as implemented in the project. |

DTOs help avoid exposing persistence entities directly for every API request and response.

### 5.5 `entity` package

Entities represent database-persisted objects. JPA/Hibernate maps these Java classes to database tables.

| File | Responsibility |
|---|---|
| `Student.java` | Represents a student/admin user record, including identity, contact, encoded password, and role fields. |
| `Course.java` | Represents a course and its stored details, such as title, description, and duration. |
| `Enrollment.java` | Represents the relationship between a student and a course, including enrollment information. |

### 5.6 `enums` package

**`Role.java`**

- Defines the supported user roles, such as `STUDENT` and `ADMIN`.
- Keeps role values consistent across authentication and authorization logic.
- Spring Security role checks such as `hasRole("ADMIN")` expect the corresponding authority convention to be used consistently.

### 5.7 `exception` package

| File | Responsibility |
|---|---|
| `GlobalExceptionHandler.java` | Centralizes handling of application exceptions and converts them into API error responses. |
| `EmailAlreadyExistsException.java` | Represents the case where a registration attempts to use an email that already exists. |
| `InvalidCredentialsException.java` | Represents an unsuccessful login caused by invalid credentials. |

Centralized exception handling helps return consistent error responses instead of exposing internal stack traces to clients.

### 5.8 `repository` package

Repositories provide the persistence layer and communicate with MySQL through Spring Data JPA.

| File | Responsibility |
|---|---|
| `StudentRepository.java` | Performs student/admin database operations and supports lookups such as finding a user by email. |
| `CourseRepository.java` | Performs course database operations. |
| Enrollment repository | Performs enrollment persistence and lookups, including checking or retrieving a student's enrollments. Check the exact class name in the repository. |

A repository normally extends a Spring Data interface such as `JpaRepository`, allowing standard CRUD operations without writing each SQL statement manually.

### 5.9 `service` package

Services contain application/business logic and coordinate repositories and supporting services.

| File | Responsibility |
|---|---|
| `StudentService.java` | Implements student registration, password hashing, login verification, profile, and student-related business operations. |
| `CourseService.java` | Implements course-related business rules and coordinates course persistence. |
| `JwtService.java` | Creates and validates JWT tokens and extracts the required token information. |
| `CustomUserDetailsService.java` | Loads user details for Spring Security authentication using the project's user data. |
| Enrollment service | Implements enrollment rules, such as associating a student with a course and retrieving a student's enrollments. Check the exact class name in the repository. |

### 5.10 `resources/application.properties`

- Holds Spring Boot configuration.
- Common settings include server port, datasource configuration, JPA/Hibernate behavior, and application-specific settings.
- Local development configuration must point to the developer's local MySQL database.
- Production values are supplied through Railway environment variables.

**Never commit real database passwords, JWT secrets, or admin passwords to GitHub.** Use environment variables or an untracked local configuration file for secrets.

---

## 6. Frontend -- Application Responsibilities

Frontend source root:

```text
lms/
```

The frontend is a React application built with Vite.

### Important frontend files

| File | Responsibility |
|---|---|
| `package.json` | Lists frontend dependencies and scripts such as development, build, and preview. |
| `vite.config.js` | Configures Vite and the preview host settings used by the Railway deployment. |
| `index.html` | HTML document loaded by the browser; Vite uses it as the frontend entry page. |
| `src/App.jsx` | Defines the main application route mapping. |
| Axios API configuration file | Creates the Axios instance, defines the backend API base URL, and attaches the JWT token to outgoing requests. Locate this file in `src`; it is the shared API communication point. |

### Routes configured in `App.jsx`

The application routes include:

| Route | Purpose |
|---|---|
| `/` | Main/home page |
| `/login` | Shared login page for Admin and Student |
| `/register` | Student registration |
| `/courses` | Course listing |
| `/admin-dashboard` | Admin dashboard |
| `/student-dashboard` | Student dashboard |
| `/manage-courses` | Admin course management |
| `/manage-students` | Admin student management |
| `/my-enrollments` | Student's enrolled courses |

The route configuration decides which React page is rendered for a URL. Actual access control must also be enforced by the backend; hiding a frontend route alone is not security.

### Axios request flow

The shared Axios configuration uses the deployed backend API base URL:

```javascript
baseURL: "https://lmslearningproject-production.up.railway.app/api"
```

The request interceptor reads the token from browser local storage and attaches it to the request:

```text
React page / component
        |
        v
Axios API module
        |
        v
Read token from localStorage
        |
        v
Add Authorization: Bearer <token>
        |
        v
Send HTTP request to Spring Boot
        |
        v
Receive JSON response
        |
        v
Update React UI
```

The token is not needed for public registration and login requests. Protected API calls require a valid token and the appropriate role.

---

## 7. Complete Application Flows

### 7.1 Student registration flow

```text
Student opens /register
        |
        v
Enters registration details
        |
        v
React validates form input
        |
        v
Axios sends POST /api/students/register
        |
        v
StudentController
        |
        v
StudentService
        |
        +--> Check whether email already exists
        |
        +--> Encode password using BCrypt
        |
        +--> Assign STUDENT role
        |
        v
StudentRepository
        |
        v
MySQL students table
        |
        v
API response returned to React
        |
        v
Registration result displayed
```

Registration is public. Admin accounts are initialized separately by the backend initializer and configured deployment variables.

### 7.2 Admin and Student login flow

Both roles use the same login endpoint.

```text
User opens /login
        |
        v
Enters email and password
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
Find user by email
        |
        v
Verify submitted password against BCrypt hash
        |
        v
JwtService creates JWT
        |
        v
Login response returned to React
        |
        v
Frontend stores token and user/role information
        |
        +----------------------+
        |                      |
        v                      v
      ADMIN                  STUDENT
        |                      |
        v                      v
Admin Dashboard         Student Dashboard
```

The frontend uses the role returned by the login response to direct the user to the appropriate dashboard. The backend independently checks the role on protected endpoints.

### 7.3 JWT authentication flow for protected requests

```text
User is logged in
        |
        v
Frontend sends API request
        |
        v
Axios interceptor attaches JWT
        |
        v
Authorization: Bearer <JWT>
        |
        v
JwtAuthenticationFilter
        |
        v
JwtService validates token
        |
        v
User details loaded
        |
        v
Spring Security establishes authentication
        |
        v
SecurityConfig checks endpoint and role
        |
        +--------------------+
        |                    |
        v                    v
      Allowed              Rejected
        |                    |
        v                    v
   Controller             401 / 403
```

- `401 Unauthorized` generally indicates missing or invalid authentication.
- `403 Forbidden` generally indicates that the request is not permitted for the authenticated user or endpoint policy.

### 7.4 Course management flow

**Admin creates, updates, or deletes a course:**

```text
Admin Dashboard
        |
        v
Manage Courses page
        |
        v
Admin submits course action
        |
        v
Axios sends request with JWT
        |
        v
JwtAuthenticationFilter
        |
        v
SecurityConfig checks ADMIN role
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
MySQL courses table
        |
        v
Response returned to frontend
        |
        v
Course list refreshed
```

**Student views courses:**

```text
Student Dashboard / Courses page
        |
        v
GET /api/courses
        |
        v
JWT authentication and role check
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
MySQL
        |
        v
Course list returned to React
```

### 7.5 Student enrollment flow

```text
Student logs in
        |
        v
Opens Courses page
        |
        v
Selects a course and clicks Enroll
        |
        v
Frontend sends enrollment request with JWT
        |
        v
JWT filter authenticates student
        |
        v
SecurityConfig checks STUDENT role
        |
        v
Enrollment API / business logic
        |
        +--> Identify logged-in student
        |
        +--> Verify selected course
        |
        +--> Check duplicate enrollment
        |
        v
Enrollment repository saves enrollment
        |
        v
MySQL enrollment record
        |
        v
Success response returned
        |
        v
Student opens My Enrollments
        |
        v
GET /api/enrollments/my-courses
        |
        v
Only that student's enrollments are returned
```

The backend must derive the authenticated student's identity from the authenticated request rather than trusting a student ID supplied by the browser for ownership-sensitive operations.

### 7.6 Admin enrollment viewing flow

```text
Admin Dashboard
        |
        v
Requests enrollment list
        |
        v
JWT authentication
        |
        v
SecurityConfig checks ADMIN role
        |
        v
Enrollment API and service logic
        |
        v
Enrollment repository
        |
        v
MySQL
        |
        v
Enrollment records returned to Admin UI
```

---

## 8. REST API Reference

The following table documents the API routes configured for the application. Confirm exact HTTP methods and request/response fields against the current controller classes before using this as a formal API contract.

### Student APIs

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | `/api/students/register` | Public | Register a student |
| POST | `/api/students/login` | Public | Authenticate Admin or Student |
| GET | `/api/students/profile` | Student / Admin | Get authenticated user's profile |
| GET | `/api/students` | Admin | List student records |
| GET | `/api/students/{id}` | Admin | Get a student by ID |
| PUT | `/api/students/{id}` | Admin | Update a student record |
| DELETE | `/api/students/{id}` | Admin | Delete a student record |

### Course APIs

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | `/api/courses` | Admin | Create a course |
| GET | `/api/courses` | Authenticated Student / Admin | List courses |
| GET | `/api/courses/{id}` | Authenticated Student / Admin | Get a course |
| PUT | `/api/courses/{id}` | Admin | Update a course |
| DELETE | `/api/courses/{id}` | Admin | Delete a course |

### Enrollment APIs

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | `/api/enrollments` | Student | Enroll in a course |
| GET | `/api/enrollments/my-courses` | Student | Get the logged-in student's enrollments |
| GET | `/api/enrollments` | Admin | View all enrollments |

### Authorization header

For protected endpoints:

```http
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

---

## 9. Database Design

The application uses MySQL. For local development, the configured database name is:

```sql
CREATE DATABASE lms_db;
```

Hibernate/JPA manages entity-to-table mapping based on the entity definitions and configured schema-generation strategy.

### Main data concepts

#### Students / Users

Stores Admin and Student account records.

| Field | Meaning |
|---|---|
| `id` | Primary identifier |
| `name` | User name |
| `email` | User email; should be unique |
| `password` | BCrypt-encoded password |
| `phone` | Phone number, if included in the entity |
| `role` | `STUDENT` or `ADMIN` |

#### Courses

Stores the courses available in the portal.

| Field | Meaning |
|---|---|
| `id` | Course identifier |
| `title` | Course title |
| `description` | Course description |
| `duration` | Course duration |

#### Enrollments

Connects a student to a course.

| Field | Meaning |
|---|---|
| `id` | Enrollment identifier |
| `student_id` | Reference to a student |
| `course_id` | Reference to a course |
| `enrollment_date` | Date/time of enrollment, if defined in the entity |

### Relationship overview

```text
STUDENT 1 -------- MANY ENROLLMENT
                         |
                         |
COURSE  1 -------- MANY ENROLLMENT
```

A student can enroll in multiple courses. A course can have multiple students. Each enrollment record links one student to one course.

> Actual SQL column names, constraints, join-column names, and timestamp types are determined by the JPA entity annotations and database schema. Use the entity classes as the source of truth.

---

## 10. Security Design

The backend uses Spring Security and JWT for stateless API security.

### Implemented security concepts

- BCrypt password hashing.
- JWT-based authentication.
- Role-based authorization for Admin and Student.
- Public student registration and login endpoints.
- Admin-only course modification.
- Authenticated course viewing.
- Student-only enrollment operations.
- Admin enrollment viewing.
- CORS configuration for local development and the deployed frontend.

### Role permissions

| Feature | Student | Admin |
|---|---:|---:|
| Register as a student | Yes | No |
| Login | Yes | Yes |
| View own profile | Yes | Yes |
| View courses | Yes | Yes |
| Add courses | No | Yes |
| Update courses | No | Yes |
| Delete courses | No | Yes |
| Enroll in courses | Yes | No |
| View own enrollments | Yes | No |
| View all enrollments | No | Yes |
| Manage student records | No | Yes |

Backend authorization is the security boundary. Frontend route restrictions are only a user-interface convenience.

---

## 11. Local Development Setup

### Prerequisites

Install:

- Java 21 (JDK)
- Node.js and npm
- MySQL Server
- Git
- An IDE such as Eclipse or IntelliJ IDEA

### Step 1 -- Clone the repository

```bash
git clone https://github.com/Hari-CodeTech/LMS_Learning_Project.git
cd LMS_Learning_Project
```

### Step 2 -- Configure the MySQL database

Start MySQL and create the local database:

```sql
CREATE DATABASE lms_db;
```

Configure the local datasource username and password using environment variables or a local, untracked configuration file. Do not put real credentials into a committed file.

Typical local datasource URL:

```text
jdbc:mysql://localhost:3306/lms_db
```

The application also needs the JWT secret and any configured Admin initialization values. Supply them locally through environment variables matching the names expected by the backend configuration.

### Step 3 -- Run the backend

Open a terminal in the backend directory:

```bash
cd lms_backend/lms-backend
```

On Windows:

```powershell
.\mvnw.cmd clean package -DskipTests
.\mvnw.cmd spring-boot:run
```

The backend is configured to run on port `8080` in the described setup:

```text
http://localhost:8080
```

### Step 4 -- Run the frontend

Open a second terminal:

```bash
cd lms
npm install
npm run dev
```

Vite normally serves the development frontend at:

```text
http://localhost:5173
```

Ensure the frontend Axios base URL points to the local backend API during local development:

```text
http://localhost:8080/api
```

For deployment, use the Railway backend API URL instead.

### Step 5 -- Build the frontend

```bash
npm run build
```

The production build is generated in the `dist` directory.

---

## 12. Deployment Architecture -- Railway

The deployed application uses separate Railway services for the frontend, backend, and MySQL database.

```text
Browser
   |
   v
Railway Frontend Service
React + Vite
   |
   | HTTPS API requests
   v
Railway Backend Service
Spring Boot
   |
   | JDBC connection
   v
Railway MySQL Service
```

### Frontend service

- Root directory: `/lms`
- Build command: `npm run build`
- Start command used for the current deployment:

```bash
npm run preview -- --host 0.0.0.0 --port $PORT
```

- Vite preview host configuration includes the Railway frontend hostname in `preview.allowedHosts`.
- Axios base URL points to the deployed backend API.

### Backend service

- Root directory: `/lms_backend/lms-backend`
- Runs the Spring Boot application on the Railway-provided port / configured application port.
- Connects to Railway MySQL using Railway environment-variable references.
- Uses environment variables for JWT configuration and initial Admin credentials.

### Backend environment variables

The deployed service was configured with these variable names:

| Variable | Purpose |
|---|---|
| `APP_JWT_SECRET` | Secret used for signing/verifying JWTs |
| `APP_JWT_EXPIRATION` | Token validity duration |
| `SPRING_DATASOURCE_URL` | JDBC URL to Railway MySQL |
| `SPRING_DATASOURCE_USERNAME` | Railway MySQL username |
| `SPRING_DATASOURCE_PASSWORD` | Railway MySQL password |
| `SPRING_JPA_HIBERNATE_DDL_AUTO` | Hibernate schema update strategy |
| `APP_ADMIN_EMAIL` | Initial Admin email |
| `APP_ADMIN_PASSWORD` | Initial Admin password |

The database connection uses Railway's MySQL service-reference variables rather than hard-coded credentials.

**Never publish the values of these variables.** Do not add passwords, database credentials, or JWT secrets to this README or source control.

### CORS

The backend CORS allowlist must include the exact deployed frontend origin and, when local development is required, the local Vite origin.

If the frontend domain changes, update the backend CORS allowlist and redeploy the backend.

---

## 13. Testing Checklist

The following workflows were reported as tested on the deployed application:

- [x] Admin login
- [x] Student registration and login
- [x] Course creation
- [x] Course viewing
- [x] Course update and deletion
- [x] Student management
- [x] Student course enrollment
- [x] Student's My Enrollments view
- [x] Admin enrollment view

Additional checks recommended before describing the application as production-hardened:

- [ ] Verify database records survive a Railway redeployment/restart.
- [ ] Verify students cannot call Admin-only APIs.
- [ ] Verify invalid/expired JWT requests are rejected.
- [ ] Verify duplicate enrollment is rejected.
- [ ] Verify duplicate email registration is rejected.
- [ ] Test responsive layouts on mobile and tablet.
- [ ] Review production logs and remove any sensitive logging.
- [ ] Rotate credentials that may have been exposed during development and remove secrets from Git history.

---

## 14. Common Issues and Troubleshooting

### Frontend displays a network error

- Confirm the frontend Axios base URL points to the deployed backend and includes `/api`.
- Confirm the backend Railway service is running.
- Inspect the browser Developer Tools → Network tab for the failed request.

### Browser reports a CORS error

- Confirm the exact frontend origin is present in `SecurityConfig.java`.
- Do not include a trailing slash in the allowed origin.
- Redeploy the backend after changing CORS settings.

### `401 Unauthorized`

- The request may not contain a token, or the token may be invalid or expired.
- Log in again and retry.
- Confirm the Axios interceptor adds `Authorization: Bearer <token>`.

### `403 Forbidden`

- The user may be authenticated but lack the required role.
- Confirm the endpoint's authorization rule in `SecurityConfig.java`.
- A `403` at the backend root URL is not necessarily an application failure; the root path may not be a public endpoint.

### Database connection failure

- Check that the Railway MySQL service is running.
- Check the backend datasource variable references.
- Review backend deployment logs.
- Never paste database passwords into public issues or source code.

### Frontend domain blocked by Vite

- Confirm the deployed hostname is listed in `preview.allowedHosts` in `vite.config.js`.
- Rebuild and redeploy the frontend.

---

## 15. Future Enhancements

Possible future improvements include:

- Course lessons and learning materials.
- Course progress tracking.
- Student performance reports.
- Course completion status and certificates.
- Search, filtering, and pagination.
- Admin analytics and reporting.
- Profile editing and password reset.
- More comprehensive automated tests.
- Production-grade monitoring and backup strategy.

---

## 16. Learning Outcomes

This project demonstrates practical implementation of:

- Full-stack application architecture.
- React component and route-based frontend development.
- REST API development using Spring Boot.
- Layered backend design using Controller, Service, and Repository.
- Object-relational mapping using JPA and Hibernate.
- MySQL database integration.
- Password hashing using BCrypt.
- Authentication using JWT.
- Role-based authorization using Spring Security.
- Frontend/backend integration using Axios.
- Git/GitHub version control.
- Deployment of frontend, backend, and database services using Railway.

---

## 17. Author

**Hari Satya Sai Puvvala**

- GitHub: https://github.com/Hari-CodeTech
- Project Repository: https://github.com/Hari-CodeTech/LMS_Learning_Project

---

## 18. Project Summary

The LMS Portal V1.0 is a full-stack web application in which React provides the user interface, Spring Boot exposes REST APIs and implements business logic, Spring Security and JWT protect the APIs, and MySQL stores application data.

The main request flow is:

```text
React UI
   |
   v
Axios API request
   |
   v
Spring Security + JWT
   |
   v
Controller
   |
   v
Service
   |
   v
Repository
   |
   v
JPA / Hibernate
   |
   v
MySQL
   |
   v
JSON response to React
```

This structure separates presentation, business logic, security, and persistence responsibilities, making the application easier to understand, maintain, and extend.