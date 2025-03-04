import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

const BookAppointment = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); // Get logged-in user

  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    age: "",
    appointmentDate: "",
    email: "",
    phone: "",
    diseases: "",
    doctorId: "",
    address: "",
    userId: user ? user.id : "",
  });

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:8090/api/doctors/all");
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log the form data before sending
    console.log("Submitting form data:", formData);

    // Basic validation
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.doctorId
    ) {
      setErrorMsg("Please fill all required fields!");
      setSuccessMsg("");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8090/api/appointments/add",
        {
          ...formData,
          doctorId: Number(formData.doctorId), // Ensure it's a number
          userId: Number(user.id), // Ensure it's a number
        }
      );
      console.log("Response:", response.data);
      if (response.status === 200 || response.status === 201) {
        console.log("Response:", response.data);
        setSuccessMsg("Appointment booked successfully!");
        setErrorMsg("");
        setFormData({
          fullName: "",
          gender: "",
          age: "",
          appointmentDate: "",
          email: "",
          phone: "",
          diseases: "",
          doctorId: "",
          address: "",
          userId: user ? user.id : "",
        });
      } else {
        setErrorMsg("Something went wrong! Please try again.");
        setSuccessMsg("");
      }
    } catch (error) {
      if (error.response) {
        // Server responded with an error status code
        console.error("Error Response:", error.response.data);

        if (error.response.status === 400) {
          setErrorMsg("Bad Request: Please check your input data.");
        } else if (error.response.status === 404) {
          setErrorMsg("Server not found. Please try again later.");
        } else if (error.response.status === 500) {
          setErrorMsg("Internal Server Error. Please contact support.");
        } else {
          setErrorMsg("An unexpected error occurred. Please try again.");
        }
      } else if (error.request) {
        // Request was made but no response received
        console.error("No response received:", error.request);
        setErrorMsg(
          "No response from the server. Check your network connection."
        );
      } else {
        // Something else happened
        console.error("Error Message:", error.message);
        setErrorMsg("An error occurred: " + error.message);
      }

      setSuccessMsg("");
    }
  };

  return (
    <>
      <Navbar />
      <div className="appointment-container">
        <div className="appointment-form">
          <h3 className="text-center text-white mb-3">Book Your Appointment</h3>

          {/* Success & Error Messages */}
          {successMsg && (
            <div className="alert alert-success text-center fw-bold fs-5">
              {successMsg}
            </div>
          )}
          {errorMsg && (
            <div className="alert alert-danger text-center fw-bold fs-5">
              {errorMsg}
            </div>
          )}

          {/* Appointment Form */}
          <form onSubmit={handleSubmit}>
            <input type="hidden" name="userId" value={formData.userId} />

            <div className="mb-3">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="mb-3">
              <label>Gender</label>
              <select
                className="form-control"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option disabled value="">
                  -- Select Gender --
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="mb-3">
              <label>Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your age"
                required
              />
            </div>

            <div className="mb-3">
              <label>Appointment Date</label>
              <input
                type="date"
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-3">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div className="mb-3">
              <label>Diseases</label>
              <input
                type="text"
                name="diseases"
                value={formData.diseases}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter any diseases"
                required
              />
            </div>

            <div className="mb-3">
              <label>Doctor</label>
              <select
                className="form-control"
                name="doctorId"
                value={formData.doctorId}
                onChange={handleChange}
                required
              >
                <option disabled value="">
                  -- Select Doctor --
                </option>
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.fullName} ({doctor.specialist})
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label>Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="form-control"
                rows="3"
                placeholder="Enter your full address"
                required
              ></textarea>
            </div>

            {user ? (
              <button
                type="submit"
                className="btn btn-success btn-submit w-100"
              >
                Submit
              </button>
            ) : (
              <button
                className="btn btn-success btn-submit w-100"
                onClick={() => navigate("/user-login")}
              >
                Login to Book
              </button>
            )}
          </form>
        </div>
      </div>
      <Footer />

      {/* Custom Styles */}
      <style>
        {`
          .appointment-container {
            position: relative;
            width: 100%;
            min-height: 100vh;
            background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
                        url("/img/hospital1.jpg") no-repeat center center/cover;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 40px 20px;
          }

          .appointment-form {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(10px);
            border-radius: 12px;
            padding: 30px;
            width: 100%;
            max-width: 500px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
          }

          .appointment-form label {
            font-weight: bold;
            color: #fff;
          }

          .appointment-form .form-control {
            border-radius: 8px;
            padding: 10px;
            font-size: 16px;
          }

          .appointment-form .btn-submit {
            background: #28a745;
            border: none;
            font-size: 18px;
            padding: 10px;
            border-radius: 8px;
            transition: 0.3s;
          }

          .appointment-form .btn-submit:hover {
            background: #218838;
          }
        `}
      </style>
    </>
  );
};

export default BookAppointment;
