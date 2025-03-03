import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/Navbar";

const UserSignup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate form before submission
  const validateForm = () => {
    let newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8090/api/users/register",
        formData
      );
      setMessage({ type: "success", text: "Signup successful! Redirecting..." });
      setTimeout(() => navigate("/user-login"), 2000);
    } catch (error) {
      setMessage({ type: "error", text: "Signup failed. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="signup-card p-4 text-white" style={cardStyle}>
          <h3 className="text-center mb-3">
            <i className="fa fa-user-plus"></i> User Registration
          </h3>

          {/* Success or Error Message */}
          {message && (
            <div
              className={`alert text-center ${message.type === "success" ? "alert-success" : "alert-danger"}`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="fullName"
                className="form-control"
                placeholder="Enter full name"
                value={formData.fullName}
                onChange={handleChange}
              />
              {errors.fullName && <small className="text-danger">{errors.fullName}</small>}
            </div>

            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <small className="text-danger">{errors.email}</small>}
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <small className="text-danger">{errors.password}</small>}
            </div>

            <button type="submit" className="btn btn-custom w-100" disabled={loading}>
              {loading ? <span className="spinner-border spinner-border-sm"></span> : "Register"}
            </button>
          </form>

          <p className="text-center mt-3">
            Already have an account?{" "}
            <a href="/user-login" className="text-decoration-none text-light">
              Login here
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

// Glassmorphism Card Style
const cardStyle = {
  maxWidth: "400px",
  width: "90%",
  background: "rgba(255, 255, 255, 0.15)",
  backdropFilter: "blur(12px)",
  borderRadius: "15px",
  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
};

export default UserSignup;
