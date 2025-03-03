import React from "react";
import { Link } from "react-router-dom";

const AdminNavbar = ({ handleLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <i className="fa-sharp fa-solid fa-hospital"></i> HMS
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                <i className="fa fa-home"></i> HOME
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/doctor-register">
                <i className="fa-solid fa-user-doctor"></i> DOCTOR
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/view-doctors">
                <i className="fa-solid fa-list"></i> VIEW DOCTOR
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/manage-patients">
                <i className="fa fa-wheelchair"></i> PATIENT
              </Link>
            </li>
          </ul>

          {/* Admin Dropdown */}
          <div className="dropdown">
            <button
              className="btn btn-light dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fa fa-universal-access"></i> Admin
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <button className="dropdown-item" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
