import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NavBar from "../components/Navbar";
const Home = () => {
  const homeStyles = {
    textAlign: "center",
    padding: "50px 20px",
  };

  const heroSection = {
    backgroundColor: "#007bff",
    color: "#ffffff",
    padding: "60px 20px",
    borderRadius: "10px",
    marginBottom: "30px",
  };

  const ctaButton = {
    backgroundColor: "#28a745",
    color: "#ffffff",
    padding: "10px 20px",
    textDecoration: "none",
    borderRadius: "5px",
    fontSize: "18px",
    fontWeight: "bold",
    display: "inline-block",
    marginTop: "15px",
  };

  const featureSection = {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
    marginBottom: "40px",
  };

  const featureCard = {
    backgroundColor: "#f8f9fa",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    width: "250px",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
  };

  const featureIcon = {
    fontSize: "40px",
    color: "#007bff",
    marginBottom: "10px",
  };

  const teamSection = {
    backgroundColor: "#f8f9fa",
    padding: "50px 20px",
    borderRadius: "10px",
  };

  const teamCard = {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
  };

  const teamImg = {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid #007bff",
  };

  return (
    <>
      <NavBar />
      {/* Hero Section */}
      <section style={heroSection}>
        <div style={homeStyles}>
          <h1>Advanced Healthcare for Everyone</h1>
          <p>
            Experience world-class medical care with cutting-edge technology.
          </p>
          <Link to="/appointment" style={ctaButton}>
            Book an Appointment
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section style={featureSection}>
        {[
          {
            icon: "fas fa-shield-alt",
            title: "100% Safety",
            text: "Advanced safety protocols and continuous monitoring for complete protection.",
          },
          {
            icon: "fas fa-hospital",
            title: "Modern Facility",
            text: "State-of-the-art medical facilities with the latest technology.",
          },
          {
            icon: "fas fa-user-md",
            title: "Expert Doctors",
            text: "Highly qualified professionals dedicated to providing the best care.",
          },
          {
            icon: "fas fa-microscope",
            title: "Research Lab",
            text: "Advanced research facilities pushing the boundaries of medicine.",
          },
        ].map((feature, index) => (
          <div key={index} style={featureCard}>
            <div style={featureIcon}>
              <i className={feature.icon}></i>
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.text}</p>
          </div>
        ))}
      </section>

      {/* Team Section */}
      <section style={teamSection}>
        <h2 style={{ textAlign: "center", color: "#28a745" }}>
          Meet Our Expert Team
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          {[
            {
              name: "Dr. Heisenberg",
              role: "CEO & Chairman",
              img: "https://pbs.twimg.com/profile_images/421396899036295168/jRjL34RS.jpeg",
            },
            {
              name: "Dr. Wanda",
              role: "Chief Doctor",
              img: "https://www.looper.com/img/gallery/how-old-is-wanda-in-wandavision/intro-1612546055.jpg",
            },
            {
              name: "Dr. John",
              role: "Chief Doctor",
              img: "https://i.pinimg.com/originals/4c/78/a6/4c78a6155ccc914773009716ead2be10.jpg",
            },
          ].map((doctor, index) => (
            <div key={index} style={teamCard}>
              <img src={doctor.img} alt={doctor.name} style={teamImg} />
              <h5>{doctor.name}</h5>
              <p style={{ color: "#6c757d" }}>{doctor.role}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
