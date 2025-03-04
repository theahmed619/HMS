import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../components/Navbar";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8090/api/users/login",
        { email, password }
      );
      console.log(response.data);
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data)); // Store user data
        setMessage({ type: "success", text: "Login successful!" });
        setTimeout(() => navigate("/"), 1000); // Redirect after success
      }
    } catch (error) {
      setMessage({ type: "error", text: "Invalid email or password!" });
    }
  };

  return (
    <>
      <NavBar />
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-gradient">
        <div className="glass-card p-4 rounded shadow-lg text-white">
          <h3 className="text-center mb-3">
            <i className="fa fa-user-circle"></i> User Login
          </h3>

          {message && (
            <div
              className={`alert text-center ${
                message.type === "success" ? "alert-success" : "alert-danger"
              }`}
              role="alert"
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-3 input-group">
              <span className="input-group-text bg-transparent border-0 text-white">
                <i className="fa fa-envelope"></i>
              </span>
              <input
                type="email"
                placeholder="Enter Email"
                className="form-control bg-transparent border-0 text-white"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3 input-group">
              <span className="input-group-text bg-transparent border-0 text-white">
                <i className="fa fa-lock"></i>
              </span>
              <input
                type="password"
                placeholder="Enter Password"
                className="form-control bg-transparent border-0 text-white"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-danger w-100">
              Login
            </button>
          </form>

          <p className="text-center mt-3">
            Don't have an account?{" "}
            <a href="/user-signup" className="text-warning">
              Create one
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

// Custom Glassmorphism CSS
const style = document.createElement("style");
style.innerHTML = `
  .bg-gradient { background: linear-gradient(135deg, #2E3192, #1BFFFF); }
  .glass-card { 
    max-width: 400px; width: 90%;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(12px);
    border-radius: 15px;
    padding: 20px;
  }
  .form-control::placeholder { color: rgba(255, 255, 255, 0.8); }
  .btn-danger { background: rgba(255, 0, 0, 0.8); border: none; }
  .btn-danger:hover { background: rgba(200, 0, 0, 0.9); }
`;
document.head.appendChild(style);

export default UserLogin;
