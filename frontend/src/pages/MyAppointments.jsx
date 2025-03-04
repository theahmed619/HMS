import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const user = JSON.parse(localStorage.getItem("user")); // Assuming user is stored in localStorage

  useEffect(() => {
    if (user && user.id) {
      fetchAppointments(user.id);
    }
  }, [user]);

  const fetchAppointments = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:8090/api/appointments/user/${userId}`
      );
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  return (
    <div>
      <Navbar />

      {/* Page Title */}
      <h2 className="text-center text-white mt-4">Your Appointments</h2>

      {/* Appointment List */}
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-9">
            <div className="glass-card">
              <h4 className="text-center text-white mb-4">
                <i className="fas fa-calendar-check"></i> Appointment List
              </h4>

              {/* Appointment Table */}
              <table className="table custom-table text-center">
                <thead>
                  <tr>
                    <th>Full Name</th>
                    <th>Gender</th>
                    <th>Age</th>
                    <th>Appointment Date</th>
                    <th>Phone</th>
                    <th>Diseases</th>
                    <th>Doctor</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.length > 0 ? (
                    appointments.map((appt, index) => (
                      <tr key={index}>
                        <td>{appt.fullName}</td>
                        <td>{appt.gender}</td>
                        <td>{appt.age}</td>
                        <td>{appt.appointmentDate}</td>
                        <td>{appt.phone}</td>
                        <td>{appt.diseases}</td>
                        <td>{appt.doctor.fullName}</td>
                        <td>
                          {appt.status === "Pending" && (
                            <span className="badge badge-warning">Pending</span>
                          )}
                          {appt.status === "Accept" && (
                            <span className="badge badge-success">
                              Approved
                            </span>
                          )}
                          {appt.status === "Reject" && (
                            <span className="badge badge-danger">Rejected</span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-white">
                        No Appointments Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ marginTop: "10rem" }}>
        <Footer />
      </div>
    </div>
  );
};

export default MyAppointments;
