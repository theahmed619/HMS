import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const DoctorNavbar = () => {
  const navigate = useNavigate();
  const doctor = JSON.parse(localStorage.getItem("doctor")); // Get logged-in doctor data

  const handleLogout = () => {
    localStorage.removeItem("doctor");
    navigate("/doctor-login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{ backgroundColor: "#4CAF50" }}
    >
      <div className="container-fluid">
        {/* Brand Logo */}
        <Link className="navbar-brand text-white fw-bold fs-4" to="/">
          <i className="fa-solid fa-user-doctor"></i> Doctor Panel
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler text-white"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link text-white fw-semibold px-3" to="/">
                <i className="fa fa-home"></i> Home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link text-white fw-semibold px-3"
                to="/doc-appointment"
              >
                <i className="fa fa-wheelchair"></i> Patients
              </Link>
            </li>

            {/* Profile Dropdown */}
            {doctor ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-white fw-semibold px-3"
                  href="#"
                  id="doctorDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fa-solid fa-user-md"></i> {doctor.fullName}
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end shadow"
                  aria-labelledby="doctorDropdown"
                >
                  <li>
                    <Link className="dropdown-item" to="/doctor/edit-profile">
                      <i className="fa fa-user-edit"></i> Edit Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={handleLogout}
                    >
                      <i className="fa fa-sign-out-alt"></i> Logout
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <Link
                  className="nav-link text-white fw-semibold px-3"
                  to="/doctor-login"
                >
                  <i className="fa fa-sign-in-alt"></i> Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default DoctorNavbar;
