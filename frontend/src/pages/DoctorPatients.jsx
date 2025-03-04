import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Table, Button, Alert, Container, Card } from "react-bootstrap";
import DoctorNavbar from "./DoctorNavbar";
import CommentForm from "./CommentForm"; // Import CommentForm

const DoctorPatients = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctor, setDoctor] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [activeCommentId, setActiveCommentId] = useState(null); // Track open comment form
  const navigate = useNavigate();

  useEffect(() => {
    const doctorData = JSON.parse(localStorage.getItem("doctor"));
    if (!doctorData) {
      navigate("/doctor-login");
    } else {
      setDoctor(doctorData);
      fetchAppointments(doctorData.id);
    }
  }, [navigate]);

  const fetchAppointments = async (doctorId) => {
    try {
      const response = await axios.get(
        `http://localhost:8090/api/appointments/doctor/${doctorId}`
      );
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setErrorMsg("Failed to load appointments.");
    }
  };

  return (
    <>
      <DoctorNavbar />
      <Container className="mt-4">
        <Card className="shadow p-4">
          <h3 className="text-center text-success mb-3">Patient Details</h3>

          {successMsg && <Alert variant="success">{successMsg}</Alert>}
          {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}

          <Table striped bordered hover className="text-center">
            <thead className="table-success">
              <tr>
                <th>Full Name</th>
                <th>Gender</th>
                <th>Age</th>
                <th>Appointment Date</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Diseases</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.fullName}</td>
                  <td>{appointment.gender}</td>
                  <td>{appointment.age}</td>
                  <td>{appointment.appointmentDate}</td>
                  <td>{appointment.email}</td>
                  <td>{appointment.phone}</td>
                  <td>{appointment.diseases}</td>
                  <td>
                    <span
                      className={`badge ${getStatusBadge(appointment.status)}`}
                    >
                      {appointment.status}
                    </span>
                  </td>
                  <td>
                    {appointment.status === "Pending" ? (
                      <>
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() =>
                            setActiveCommentId(
                              activeCommentId === appointment.id
                                ? null
                                : appointment.id
                            )
                          }
                        >
                          <i className="fa fa-comment"></i> Comment /
                          Prescription
                        </Button>

                        {activeCommentId === appointment.id && (
                          <CommentForm
                            appointmentId={appointment.id}
                            doctorId={doctor?.id}
                            refreshAppointments={() =>
                              fetchAppointments(doctor?.id)
                            }
                          />
                        )}
                      </>
                    ) : (
                      <Button variant="secondary" size="sm" disabled>
                        <i className="fa fa-comment"></i> Commented
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </Container>
    </>
  );
};

// Function to get Bootstrap badge class based on status
const getStatusBadge = (status) => {
  if (!status) return "bg-secondary text-white"; // Handle null or undefined status

  switch (status.toLowerCase()) { // Ensure status is a string before calling toLowerCase()
    case "pending":
      return "bg-warning text-dark";
    case "accept":
      return "bg-success text-white";
    case "reject":
      return "bg-danger text-white";
    default:
      return "bg-secondary text-white";
  }
};


export default DoctorPatients;
