
import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";

function MyEnrollments() {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchMyEnrollments();
    }, []);

    const fetchMyEnrollments = async () => {
        try {
            const response = await api.get("/enrollments/my-courses");
            setEnrollments(response.data);
        } catch (err) {
            setError("Unable to load your enrollments.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <h4 className="text-center mt-5">Loading...</h4>;
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4">My Enrollments</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            {!error && enrollments.length === 0 && (
                <div className="alert alert-info">
                    You have not enrolled in any courses yet.
                </div>
            )}

            <div className="row">
                {enrollments.map((enrollment) => (
                    <div className="col-md-4 mb-4" key={enrollment.id}>
                        <div className="card shadow h-100">
                            <div className="card-body">
                                <h5 className="card-title">
                                    {enrollment.course?.title}
                                </h5>

                                <p>
                                    {enrollment.course?.description}
                                </p>

                                <p>
                                    <strong>Duration:</strong>{" "}
                                    {enrollment.course?.duration}
                                </p>

                                <p>
                                    <strong>Enrollment Date:</strong>{" "}
                                    {enrollment.enrollmentDate
                                        ? new Date(enrollment.enrollmentDate)
                                            .toLocaleDateString()
                                        : "Not available"}
                                </p>

                                <span className="badge bg-success">
                                    Enrolled
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyEnrollments;
