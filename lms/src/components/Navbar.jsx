
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("name");
        localStorage.removeItem("email");

        navigate("/login");
    };

    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">

            {/* Logo */}
            <Link to="/" className="navbar-brand fw-bold fs-4">
                LMS Portal
            </Link>

            {/* Mobile Toggle */}
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarContent"
                aria-controls="navbarContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            {/* Navigation Links */}
            <div className="collapse navbar-collapse" id="navbarContent">

                <div className="navbar-nav mx-auto gap-3">

                    <Link to="/" className="nav-link">
                        Home
                    </Link>

                    {/* Public Courses */}
                    <Link to="/courses" className="nav-link">
                        Courses
                    </Link>

                    {/* Student Navigation */}
                    {token && role === "STUDENT" && (
                        <>
                            <Link to="/student-dashboard" className="nav-link">
                                Dashboard
                            </Link>

                            <Link to="/my-enrollments" className="nav-link">
                                My Enrollments
                            </Link>
                        </>
                    )}

                    {/* Admin Navigation */}
                    {token && role === "ADMIN" && (
                        <>
                            <Link to="/admin-dashboard" className="nav-link">
                                Dashboard
                            </Link>

                            <Link to="/manage-courses" className="nav-link">
                                Manage Courses
                            </Link>

                            <Link to="/manage-students" className="nav-link">
                                Manage Students
                            </Link>
                        </>
                    )}

                    <a href="/#about" className="nav-link">
                        About
                    </a>

                    <a href="/#contact" className="nav-link">
                        Contact
                    </a>

                </div>

                {/* Authentication Buttons */}
                <div className="d-flex gap-2">

                    {!token ? (
                        <>
                            <Link
                                to="/login"
                                className="btn btn-outline-primary px-4"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="btn btn-primary px-4"
                            >
                                Register
                            </Link>
                        </>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="btn btn-danger px-4"
                        >
                            Logout
                        </button>
                    )}

                </div>

            </div>

        </nav>
    );
}

export default Navbar;
