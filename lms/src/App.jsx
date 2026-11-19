
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import About from "./components/About";
import Footer from "./components/Footer";

import Login from "./components/Login";
import Register from "./components/Register";

import AdminDashboard from "./components/AdminDashboard";
import StudentDashboard from "./components/StudentDashboard";

import Courses from "./components/Courses";
import MyEnrollments from "./components/MyEnrollments";
import ManageCourses from "./components/ManageCourses";
import ManageStudents from "./components/ManageStudents";

import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

function Home() {
    return (
        <>
            <Navbar />
            <Hero />
            <Features />
            <About />
            <Footer />
        </>
    );
}

function App() {

    return (
        <BrowserRouter>

            <Routes>

                {/* Landing Page */}
                <Route path="/" element={<Home />} />

                {/* Authentication */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Public Courses */}
                <Route path="/courses" element={<Courses />} />

                {/* Admin Dashboard */}
                <Route
                    path="/admin-dashboard"
                    element={
                        <ProtectedRoute allowedRoles={["ADMIN"]}>
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Student Dashboard */}
                <Route
                    path="/student-dashboard"
                    element={
                        <ProtectedRoute allowedRoles={["STUDENT"]}>
                            <StudentDashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Manage Courses */}
                <Route
                    path="/manage-courses"
                    element={
                        <ProtectedRoute allowedRoles={["ADMIN"]}>
                            <ManageCourses />
                        </ProtectedRoute>
                    }
                />

                {/* Manage Students */}
                <Route
                    path="/manage-students"
                    element={
                        <ProtectedRoute allowedRoles={["ADMIN"]}>
                            <ManageStudents />
                        </ProtectedRoute>
                    }
                />

                {/* My Enrollments */}
                <Route
                    path="/my-enrollments"
                    element={
                        <ProtectedRoute allowedRoles={["STUDENT"]}>
                            <MyEnrollments />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;
