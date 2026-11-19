import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";

function Courses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await api.get("/courses");
            setCourses(response.data);
        } catch (err) {
            setError("Unable to load courses.");
        } finally {
            setLoading(false);
        }
    };

    const handleEnroll = async (courseId) => {
        setMessage("");
        setError("");

        try {
            const response = await api.post(`/enrollments/${courseId}`);

            setMessage(response.data.message || "Enrollment successful!");
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Enrollment failed. You may already be enrolled."
            );
        }
    };

    if (loading) {
        return <h4 className="text-center mt-5">Loading courses...</h4>;
    }

    return (
        <div className="container mt-5">

            <h2 className="mb-4">Available Courses</h2>

            {message && (
                <div className="alert alert-success">{message}</div>
            )}

            {error && (
                <div className="alert alert-danger">{error}</div>
            )}

            <div className="row">

                {courses.length === 0 ? (
                    <p>No courses available.</p>
                ) : (
                    courses.map((course) => (
                        <div className="col-md-4 mb-4" key={course.id}>
                            <div className="card shadow h-100">

                                <div className="card-body">
                                    <h5 className="card-title">
                                        {course.title}
                                    </h5>

                                    <p className="card-text">
                                        {course.description}
                                    </p>

                                    <p>
                                        <strong>Duration:</strong>{" "}
                                        {course.duration}
                                    </p>

                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleEnroll(course.id)}
                                    >
                                        Enroll Now
                                    </button>
                                </div>

                            </div>
                        </div>
                    ))
                )}

            </div>
        </div>
    );
}

export default Courses;