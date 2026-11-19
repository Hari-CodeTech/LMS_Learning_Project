
import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";

function ManageCourses() {

    const [courses, setCourses] = useState([]);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        duration: ""
    });

    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // Fetch all courses
    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await api.get("/courses");
            setCourses(response.data);
        } catch (err) {
            setError("Unable to fetch courses.");
        }
    };

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Add or Update Course
    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");
        setLoading(true);

        try {

            if (editingId) {

                await api.put(`/courses/${editingId}`, formData);

                setMessage("Course updated successfully!");

            } else {

                await api.post("/courses", formData);

                setMessage("Course added successfully!");
            }

            setFormData({
                title: "",
                description: "",
                duration: ""
            });

            setEditingId(null);

            await fetchCourses();

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Operation failed. Please try again."
            );

        } finally {
            setLoading(false);
        }
    };

    // Edit Course
    const handleEdit = (course) => {

        setEditingId(course.id);

        setFormData({
            title: course.title,
            description: course.description,
            duration: course.duration
        });

        setMessage("");
        setError("");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    // Cancel Edit
    const handleCancel = () => {

        setEditingId(null);

        setFormData({
            title: "",
            description: "",
            duration: ""
        });

        setMessage("");
        setError("");
    };

    // Delete Course
    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this course?"
        );

        if (!confirmDelete) return;

        setMessage("");
        setError("");

        try {

            await api.delete(`/courses/${id}`);

            setMessage("Course deleted successfully!");

            await fetchCourses();

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Unable to delete course."
            );
        }
    };

    return (

        <div className="container mt-5 mb-5">

            <h2 className="mb-4">Manage Courses</h2>

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

            {/* Add / Update Course Form */}

            <div className="card shadow-sm p-4 mb-5">

                <h4 className="mb-4">
                    {editingId ? "Update Course" : "Add New Course"}
                </h4>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">

                        <label className="form-label">
                            Course Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            className="form-control"
                            placeholder="Enter course title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Description
                        </label>

                        <textarea
                            name="description"
                            className="form-control"
                            rows="3"
                            placeholder="Enter course description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Duration
                        </label>

                        <input
                            type="text"
                            name="duration"
                            className="form-control"
                            placeholder="Example: 6 Months"
                            value={formData.duration}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary me-2"
                        disabled={loading}
                    >
                        {loading
                            ? "Please wait..."
                            : editingId
                                ? "Update Course"
                                : "Add Course"}
                    </button>

                    {editingId && (
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    )}

                </form>

            </div>

            {/* Course List */}

            <div className="card shadow-sm p-4">

                <h4 className="mb-4">
                    All Courses ({courses.length})
                </h4>

                {courses.length === 0 ? (

                    <div className="alert alert-info">
                        No courses available.
                    </div>

                ) : (

                    <div className="table-responsive">

                        <table className="table table-bordered table-hover align-middle">

                            <thead className="table-dark">

                                <tr>
                                    <th>ID</th>
                                    <th>Course Title</th>
                                    <th>Description</th>
                                    <th>Duration</th>
                                    <th>Actions</th>
                                </tr>

                            </thead>

                            <tbody>

                                {courses.map((course) => (

                                    <tr key={course.id}>

                                        <td>{course.id}</td>

                                        <td>{course.title}</td>

                                        <td>{course.description}</td>

                                        <td>{course.duration}</td>

                                        <td>

                                            <button
                                                className="btn btn-warning btn-sm me-2 mb-1"
                                                onClick={() => handleEdit(course)}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="btn btn-danger btn-sm mb-1"
                                                onClick={() => handleDelete(course.id)}
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

        </div>
    );
}

export default ManageCourses;
