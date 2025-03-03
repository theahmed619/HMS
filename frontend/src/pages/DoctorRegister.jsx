import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const DoctorRegistration = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    qualification: "",
    specialist: "",
    email: "",
    phone: "",
    password: "",
  });
  const [specialists, setSpecialists] = useState([]);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8090/api/specialists")
      .then((response) => setSpecialists(response.data))
      .catch((error) => console.error("Error fetching specialists:", error));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8090/api/doctors/add", formData)
      .then((response) => {
        setMessage({
          type: "success",
          text: "Doctor registered successfully!",
        });
        setTimeout(() => navigate("/doctor-dashboard"), 2000);
      })
      .catch((error) => {
        setMessage({ type: "danger", text: "Error registering doctor." });
      });
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm rounded">
            <div className="card-body">
              <h3 className="text-center text-primary mb-3">Register Doctor</h3>
              {message && (
                <div className={`alert alert-${message.type} text-center`}>
                  {message.text}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-bold">Full Name</label>
                  <input
                    name="fullName"
                    type="text"
                    className="form-control"
                    placeholder="Enter full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Date of Birth</label>
                  <input
                    name="dateOfBirth"
                    type="date"
                    className="form-control"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Qualification</label>
                  <input
                    name="qualification"
                    type="text"
                    className="form-control"
                    placeholder="Enter qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Specialist</label>
                  <select
                    name="specialist"
                    className="form-control"
                    value={formData.specialist}
                    onChange={handleChange}
                    required
                  >
                    <option disabled value="">
                      -- Select Specialist --
                    </option>
                    {specialists.map((sp) => (
                      <option key={sp.id} value={sp.specialistName}>
                        {sp.specialistName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Email Address</label>
                  <input
                    name="email"
                    type="email"
                    className="form-control"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Phone</label>
                  <input
                    name="phone"
                    type="text"
                    className="form-control"
                    placeholder="Enter mobile number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Password</label>
                  <input
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Register Doctor
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorRegistration;
