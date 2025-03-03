import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import { FaUserMd, FaUserCircle, FaCalendarCheck } from "react-icons/fa";
import { MdLocalHospital } from "react-icons/md";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [stats, setStats] = useState({
    totalDoctors: 0,
    totalUsers: 0,
    totalAppointments: 0,
    totalSpecialists: 0,
  });
  const [specialistName, setSpecialistName] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const adminData = localStorage.getItem("admin");
    if (!adminData) {
      navigate("/admin-login");
    } else {
      setAdmin(JSON.parse(adminData));
    }

    fetchStats();
  }, [navigate]);

  const fetchStats = async () => {
    try {
      const response = await axios.get("http://localhost:8090/api/admin/stats");
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/admin-login");
  };

  const handleAddSpecialist = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8090/api/admin/add-specialist", { specialistName });
      setShowModal(false);
      fetchStats();
    } catch (error) {
      console.error("Error adding specialist", error);
    }
  };

  return (
    <div>
      <AdminNavbar handleLogout={handleLogout} />

      <div style={styles.container}>
        <h2>Admin Dashboard</h2>
        <p>Welcome, {admin?.email || "Admin"}!</p>

        <div style={styles.cardContainer}>
          <div style={styles.card} onClick={() => navigate("/manage-doctors")}>
            <FaUserMd size={50} />
            <h3>Doctors</h3>
            <p>{stats.totalDoctors}</p>
          </div>
          <div style={styles.card} onClick={() => navigate("/manage-users")}>
            <FaUserCircle size={50} />
            <h3>Users</h3>
            <p>{stats.totalUsers}</p>
          </div>
          <div style={styles.card} onClick={() => navigate("/appointments")}>
            <FaCalendarCheck size={50} />
            <h3>Appointments</h3>
            <p>{stats.totalAppointments}</p>
          </div>
          <div style={styles.card} onClick={() => setShowModal(true)}>
            <MdLocalHospital size={50} />
            <h3>Specialists</h3>
            <p>{stats.totalSpecialists}</p>
          </div>
        </div>
      </div>

      {/* Modal for adding specialists */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>Add Specialist</h3>
            <form onSubmit={handleAddSpecialist}>
              <input
                type="text"
                placeholder="Enter Specialist Name"
                value={specialistName}
                onChange={(e) => setSpecialistName(e.target.value)}
                required
                style={styles.input}
              />
              <button type="submit" style={styles.button}>Add</button>
              <button onClick={() => setShowModal(false)} style={styles.closeButton}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { textAlign: "center", padding: "20px" },
  cardContainer: { display: "flex", justifyContent: "center", gap: "20px", marginTop: "20px" },
  card: { background: "#ff4b2b", color: "white", padding: "20px", borderRadius: "10px", cursor: "pointer", transition: "0.3s", textAlign: "center" },
  modalOverlay: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center" },
  modal: { background: "white", padding: "20px", borderRadius: "10px", textAlign: "center", width: "300px" },
  input: { width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px" },
  button: { background: "#ff4b2b", color: "white", padding: "10px", borderRadius: "5px", cursor: "pointer", border: "none" },
  closeButton: { marginTop: "10px", background: "gray", color: "white", padding: "10px", borderRadius: "5px", cursor: "pointer", border: "none" }
};

export default AdminDashboard;
