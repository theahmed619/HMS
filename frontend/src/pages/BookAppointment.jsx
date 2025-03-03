import React, { useState, useEffect } from "react";
import axios from "axios";

const BookAppointment = ({ user }) => {
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
    userId: user?.id || null,
  });

  useEffect(() => {
    axios.get("http://localhost:8090/api/appointments/doctors")
      .then(response => setDoctors(response.data))
      .catch(error => console.error("Error fetching doctors:", error));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/api/appointments/add", formData)
      .then(response => alert("Appointment booked successfully!"))
      .catch(error => alert("Error booking appointment."));
  };

  return (
    <div className="appointment-container">
      <div className="appointment-form">
        <h3 className="text-center text-white mb-3">Book Your Appointment</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Full Name</label>
            <input type="text" name="fullName" className="form-control" placeholder="Enter your full name" required onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label>Gender</label>
            <select name="gender" className="form-control" required onChange={handleChange}>
              <option disabled selected>-- Select Gender --</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="mb-3">
            <label>Age</label>
            <input type="number" name="age" className="form-control" placeholder="Enter your age" required onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label>Appointment Date</label>
            <input type="date" name="appointmentDate" className="form-control" required onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label>Email</label>
            <input type="email" name="email" className="form-control" placeholder="Enter your email" required onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label>Phone</label>
            <input type="text" name="phone" className="form-control" placeholder="Enter your phone number" required onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label>Diseases</label>
            <input type="text" name="diseases" className="form-control" placeholder="Enter any diseases" required onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label>Doctor</label>
            <select name="doctorId" className="form-control" required onChange={handleChange}>
              <option disabled selected>-- Select Doctor --</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.fullName} ({doctor.specialist})
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label>Address</label>
            <textarea name="address" className="form-control" rows="3" placeholder="Enter your full address" required onChange={handleChange}></textarea>
          </div>

          {!user ? (
            <a href="/login" className="btn btn-success btn-submit w-100">Login to Book</a>
          ) : (
            <button type="submit" className="btn btn-success btn-submit w-100">Submit</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;
