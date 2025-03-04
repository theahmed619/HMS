import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DoctorNavbar from "../pages/DoctorNavbar";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const doctor = JSON.parse(localStorage.getItem("doctor")); // Get logged-in doctor

  const [totalDoctors, setTotalDoctors] = useState(0);
  const [totalAppointments, setTotalAppointments] = useState(0);

  useEffect(() => {
    if (!doctor) {
      navigate("/doctor-login");
    } else {
      fetchDashboardData();
    }
  }, [doctor, navigate]);

  const fetchDashboardData = async () => {
    try {
      // Fetch total number of doctors
      const doctorResponse = await axios.get(
        "http://localhost:8090/api/doctors/count"
      );
      setTotalDoctors(doctorResponse.data);

      // Fetch total appointments for the logged-in doctor
      const appointmentResponse = await axios.get(
        `http://localhost:8090/api/appointments/count/${doctor.id}`
      );
      setTotalAppointments(appointmentResponse.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  return (
    <>
      <DoctorNavbar />
      <div className="container mt-5">
        <h2 className="text-center dashboard-header">Doctor Dashboard</h2>

        <div className="row justify-content-center">
          {/* Total Doctors */}
          <div className="col-md-4">
            <div className="card my-card">
              <div className="card-body text-center">
                <i className="fa-solid fa-user-doctor card-icon"></i>
                <p className="card-text">Total Doctors</p>
                <h3 className="text-success">{totalDoctors}</h3>
              </div>
            </div>
          </div>

          {/* Total Appointments */}
          <div className="col-md-4">
            <div className="card my-card">
              <div className="card-body text-center">
                <i className="fa-solid fa-calendar-check card-icon"></i>
                <p className="card-text">Total Appointments</p>
                <h3 className="text-success">{totalAppointments}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style>
        {`
          body { background-color: #f8f9fa; }
          .dashboard-header { font-weight: bold; color: #2c6e49; margin-bottom: 20px; }
          .my-card { box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); border-radius: 10px; transition: transform 0.3s, box-shadow 0.3s; background: white; }
          .my-card:hover { transform: translateY(-5px); box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3); }
          .card-body { padding: 25px; }
          .card-icon { font-size: 50px; color: #2c6e49; }
          .card-text { font-size: 20px; font-weight: bold; margin-top: 10px; }
        `}
      </style>
    </>
  );
};

export default DoctorDashboard;
