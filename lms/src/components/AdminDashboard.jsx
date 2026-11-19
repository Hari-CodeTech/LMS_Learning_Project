
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axiosConfig";


function AdminDashboard() {

    const [totalStudents, setTotalStudents] = useState(0);
    const [totalCourses, setTotalCourses] = useState(0);
    const [totalEnrollments, setTotalEnrollments] = useState(0);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {

        try {

            const [students, courses, enrollments] = await Promise.all([
                api.get("/students"),
                api.get("/courses"),
                api.get("/enrollments")
            ]);

            setTotalStudents(students.data.length);
            setTotalCourses(courses.data.length);
            setTotalEnrollments(enrollments.data.length);

        } catch (err) {

            setError("Unable to load dashboard data.");

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="container mt-5 mb-5">

            <div className="card shadow p-4">

                <h2>Admin Dashboard</h2>

                <p className="text-muted">
                    Welcome to the LMS Admin Panel.
                </p>

                {loading && <p>Loading dashboard data...</p>}

                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}

                {!loading && !error && (

                    <div className="row mt-4">

                        <div className="col-md-4 mb-3">

                            <div className="card shadow-sm p-3 text-center">

                                <h5>Total Students</h5>

                                <h2 className="text-primary">
                                    {totalStudents}
                                </h2>

                                <p>Registered students</p>

                            </div>

                        </div>

                        <div className="col-md-4 mb-3">

                            <div className="card shadow-sm p-3 text-center">

                                <h5>Total Courses</h5>

                                <h2 className="text-success">
                                    {totalCourses}
                                </h2>

                                <p>Available courses</p>

                            </div>

                        </div>

                        <div className="col-md-4 mb-3">

                            <div className="card shadow-sm p-3 text-center">

                                <h5>Total Enrollments</h5>

                                <h2 className="text-warning">
                                    {totalEnrollments}
                                </h2>

                                <p>Student enrollments</p>

                            </div>

                        </div>

                    </div>

                )}

                <hr className="my-4" />

              <div className="course-management-buttons">

    <Link to="/manage-courses" className="btn btn-primary">
        Manage Courses
    </Link>

    <Link to="/manage-students" className="btn btn-success">
        Manage Students
    </Link>

</div>

            </div>

        </div>

    );
}

export default AdminDashboard;
