import React from "react";
import { Link, useNavigate } from "react-router-dom";

function StudentDashboard() {
    const navigate = useNavigate();

    const studentName = localStorage.getItem("name") || "Student";

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("name");
        localStorage.removeItem("email");

        navigate("/login");
    };

    return (
        <div className="container mt-5">

            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2>Student Dashboard</h2>
                    <p className="text-muted">
                        Welcome, {studentName}!
                    </p>
                </div>

                <button
                    className="btn btn-danger"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>

            <div className="row">

                <div className="col-md-6 mb-3">
                    <div className="card shadow p-4">
                        <h4>Available Courses</h4>
                        <p>Explore courses and enroll in your preferred course.</p>

                        <Link to="/courses" className="btn btn-primary">
                            View Courses
                        </Link>
                    </div>
                </div>

                <div className="col-md-6 mb-3">
                    <div className="card shadow p-4">
                        <h4>My Enrollments</h4>
                        <p>View the courses you have enrolled in.</p>

                        <Link to="/my-enrollments" className="btn btn-success">
                            My Courses
                        </Link>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default StudentDashboard;