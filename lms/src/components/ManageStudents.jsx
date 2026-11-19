
import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";

function ManageStudents() {

    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    // Fetch all students
    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await api.get("/students");

            // Display only student accounts
            const studentRecords = response.data.filter(
                student => student.role === "STUDENT"
            );

            setStudents(studentRecords);

        } catch (err) {
            setError("Unable to load student records.");
        } finally {
            setLoading(false);
        }
    };

    // Search students
    const filteredStudents = students.filter(student =>
        student.name?.toLowerCase().includes(search.toLowerCase()) ||
        student.email?.toLowerCase().includes(search.toLowerCase())
    );

    // Delete student
    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this student?"
        );

        if (!confirmDelete) return;

        setMessage("");
        setError("");

        try {
            await api.delete(`/students/${id}`);

            setStudents(prev =>
                prev.filter(student => student.id !== id)
            );

            setMessage("Student deleted successfully!");

            if (selectedStudent?.id === id) {
                setSelectedStudent(null);
            }

        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Unable to delete student."
            );
        }
    };

    return (

        <div className="container mt-5 mb-5">

            <h2 className="mb-4">Manage Students</h2>

            {/* Messages */}

            {message && (
                <div className="alert alert-success">
                    {message}
                </div>
            )}

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            {/* Student Count */}

            <div className="card shadow-sm p-3 mb-4">
                <h5>Total Registered Students</h5>
                <h2 className="text-primary">
                    {students.length}
                </h2>
            </div>

            {/* Search */}

            <div className="mb-4">

                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by student name or email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>

            {/* Student Table */}

            <div className="card shadow-sm p-4">

                <h4 className="mb-4">Student Records</h4>

                {loading ? (

                    <p>Loading students...</p>

                ) : filteredStudents.length === 0 ? (

                    <div className="alert alert-info">
                        No students found.
                    </div>

                ) : (

                    <div className="table-responsive">

                        <table className="table table-bordered table-hover align-middle">

                            <thead className="table-dark">

                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Actions</th>
                                </tr>

                            </thead>

                            <tbody>

                                {filteredStudents.map(student => (

                                    <tr key={student.id}>

                                        <td>{student.id}</td>

                                        <td>{student.name}</td>

                                        <td>{student.email}</td>

                                        <td>{student.phone}</td>

                                        <td>

                                            <button
                                                className="btn btn-info btn-sm me-2 mb-1"
                                                onClick={() => setSelectedStudent(student)}
                                            >
                                                View
                                            </button>

                                            <button
                                                className="btn btn-danger btn-sm mb-1"
                                                onClick={() => handleDelete(student.id)}
                                            >
                                                Delete
                                            </button>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

            {/* Student Details */}

            {selectedStudent && (

                <div className="card shadow-sm p-4 mt-4">

                    <div className="d-flex justify-content-between">

                        <h4>Student Details</h4>

                        <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => setSelectedStudent(null)}
                        >
                            Close
                        </button>

                    </div>

                    <hr />

                    <p>
                        <strong>ID:</strong> {selectedStudent.id}
                    </p>

                    <p>
                        <strong>Name:</strong> {selectedStudent.name}
                    </p>

                    <p>
                        <strong>Email:</strong> {selectedStudent.email}
                    </p>

                    <p>
                        <strong>Phone:</strong> {selectedStudent.phone}
                    </p>

                    <p>
                        <strong>Role:</strong> {selectedStudent.role}
                    </p>

                </div>

            )}

        </div>

    );
}

export default ManageStudents;
