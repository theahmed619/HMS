import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUserShield } from "react-icons/fa"; // Admin icon
import { Navbar } from "react-bootstrap";
import NavBar from "../components/Navbar";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8090/api/admin/login",
        { email, password }
      );

      if (response.status === 200) {
        localStorage.setItem("admin", "true");
        navigate("/admin/dashboard");
      }
    } catch (error) {
      setError("Invalid Username or Password");
    }
  };

  return (
    <>
      <NavBar/>
      <div style={styles.container}>
        <div style={styles.overlay}></div>

        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <FaUserShield style={styles.icon} />
            <h3>Admin Login</h3>
          </div>

          <div style={styles.cardBody}>
            {error && <p style={styles.errorText}>{error}</p>}

            <form onSubmit={handleLogin}>
              <div style={styles.formGroup}>
                <label>Email Address</label>
                <input
                  type="email"
                  style={styles.input}
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label>Password</label>
                <input
                  type="password"
                  style={styles.input}
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" style={styles.button}>
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

// Inline Styles
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background:
      "url('https://source.unsplash.com/1600x900/?hospital') no-repeat center center fixed",
    backgroundSize: "cover",
    position: "relative",
    fontFamily: "Poppins, sans-serif",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
  },
  card: {
    background: "rgba(0, 0, 0, 0.6)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
    borderRadius: "15px",
    padding: "25px",
    color: "white",
    width: "350px",
    textAlign: "center",
    position: "relative",
    zIndex: 1,
  },
  cardHeader: {
    fontSize: "22px",
    fontWeight: "600",
    padding: "15px",
    background: "linear-gradient(135deg, #ff416c, #ff4b2b)",
    borderTopLeftRadius: "15px",
    borderTopRightRadius: "15px",
  },
  icon: {
    fontSize: "50px",
    color: "white",
  },
  cardBody: {
    padding: "20px",
  },
  formGroup: {
    marginBottom: "15px",
    textAlign: "left",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    background: "rgba(255, 255, 255, 0.2)",
    color: "white",
    outline: "none",
  },
  button: {
    background: "linear-gradient(135deg, #ff416c, #ff4b2b)",
    border: "none",
    padding: "10px",
    fontSize: "16px",
    fontWeight: "600",
    borderRadius: "8px",
    width: "100%",
    color: "white",
    cursor: "pointer",
    transition: "0.3s",
  },
  buttonHover: {
    background: "linear-gradient(135deg, #ff4b2b, #ff2200)",
    transform: "scale(1.05)",
  },
  errorText: {
    color: "red",
    fontSize: "14px",
    marginBottom: "10px",
  },
};

export default AdminLogin;
