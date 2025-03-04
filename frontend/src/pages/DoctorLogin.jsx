import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";
const DoctorLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  // Handle Login

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const response = await axios.post(
        "http://localhost:8090/api/doctors/login",
        { email, password }
      );
      console.log(response.data);
      if (response.status === 200) {
        localStorage.setItem("doctor", JSON.stringify(response.data)); // Store user data
        setMessage({ type: "success", text: "Login successful!" });
        setTimeout(() => navigate("/doctor-dashboard"), 1000); // Redirect after success
      }
    } catch (error) {
      setMessage({ type: "error", text: "Invalid email or password!" });
    }
  };

  return (
    <>
      <Navbar />
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
          <div className="text-center mb-3">
            <i className="fas fa-user-md text-success fs-1"></i>
            <h2 className="fs-4">Doctor Login</h2>
          </div>

          {/* Success Message */}
          {successMsg && <p className="alert alert-success">{successMsg}</p>}

          {/* Error Message */}
          {errorMsg && <p className="alert alert-danger">{errorMsg}</p>}

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-success w-100">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default DoctorLogin;
