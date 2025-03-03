import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DoctorNavbar from "./DoctorNavbar"; // Import the Navbar component

const DoctorDashboard = ({ doctor }) => {
  const navigate = useNavigate();
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [totalAppointments, setTotalAppointments] = useState(0);

  useEffect(() => {
    if (!doctor) {
      navigate("/doctor-login"); // Redirect if doctor is not logged in
    }

    // Fetch total number of doctors
    fetch("/api/doctors/count")
      .then((res) => res.json())
      .then((data) => setTotalDoctors(data));

    // Fetch total number of appointments for logged-in doctor
    fetch(`/api/appointments/count/${doctor?.id}`)
      .then((res) => res.json())
      .then((data) => setTotalAppointments(data));
  }, [doctor, navigate]);

  return (
    <>
      <DoctorNavbar doctor={doctor} />
      <div className="container mt-5">
        <h2 className="text-center fw-bold text-success">Doctor Dashboard</h2>

        <div className="row justify-content-center mt-4">
          {/* Total Doctors */}
          <div className="col-md-4">
            <div className="card shadow-lg p-4 text-center">
              <i className="fa-solid fa-user-doctor fa-3x text-success"></i>
              <p className="fw-bold mt-3">Total Doctors</p>
              <h3 className="text-success">{totalDoctors}</h3>
            </div>
          </div>

          {/* Total Appointments */}
          <div className="col-md-4">
            <div className="card shadow-lg p-4 text-center">
              <i className="fa-solid fa-calendar-check fa-3x text-success"></i>
              <p className="fw-bold mt-3">Total Appointments</p>
              <h3 className="text-success">{totalAppointments}</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorDashboard;
