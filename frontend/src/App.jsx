import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/Navbar";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "@fortawesome/fontawesome-free/css/all.min.css";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import BookAppointment from "./pages/BookAppointment";
import DoctorDashboard from "./pages/DoctorDashboard";
import DoctorLogin from "./pages/DoctorLogin";
import DoctorRegister from "./pages/DoctorRegister";
import MyAppointment from "./pages/MyAppointments";
import DoctorPatients from "./pages/DoctorPatients";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/user-signup" element={<UserSignup />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="/doctor-login" element={<DoctorLogin />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor-register" element={<DoctorRegister />} />
          <Route path="/my-appointment" element={<MyAppointment />} />
          <Route path="/doc-appointment" element={<DoctorPatients />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
