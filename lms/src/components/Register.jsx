import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: ""
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            const response = await api.post("/students/register", formData);
            setMessage(response.data.message || "Registration successful!");

            setTimeout(() => navigate("/login"), 1500);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Registration failed. Please check your details."
            );
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow p-4">
                        <h2 className="text-center mb-4">Student Registration</h2>

                        {message && (
                            <div className="alert alert-success">{message}</div>
                        )}

                        {error && (
                            <div className="alert alert-danger">{error}</div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <input
                                className="form-control mb-3"
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />

                            <input
                                className="form-control mb-3"
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                            <input
                                className="form-control mb-3"
                                type="password"
                                name="password"
                                placeholder="Password (minimum 8 characters)"
                                value={formData.password}
                                onChange={handleChange}
                                minLength="8"
                                required
                            />

                            <input
                                className="form-control mb-3"
                                type="tel"
                                name="phone"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={handleChange}
                                pattern="[6-9][0-9]{9}"
                                title="Enter a valid 10-digit Indian mobile number"
                                required
                            />

                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                            >
                                Register
                            </button>
                        </form>

                        <p className="text-center mt-3">
                            Already registered? <Link to="/login">Login</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;