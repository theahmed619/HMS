import React from "react";

const Footer = () => {
  const footerStyle = {
    background: "linear-gradient(135deg, #102c42 0%, #1f5d50 100%)",
    padding: "40px 0",
    color: "rgba(255, 255, 255, 0.8)",
  };

  const bottomStyle = {
    background: "#0d2435",
    padding: "15px 0",
    textAlign: "center",
  };

  const socialIconStyle = {
    width: "40px",
    height: "40px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "10px",
    borderRadius: "50%",
    border: "1px solid white",
    color: "white",
    transition: "all 0.3s ease",
  };

  const hoverEffect = {
    background: "white",
    color: "#1f5d50",
  };

  return (
    <footer className="footer">
      <div style={footerStyle}>
        <div className="container">
          <div className="row g-4">
            {/* Company Info */}
            <div className="col-lg-4 col-md-6">
              <h3 style={{ color: "white", marginBottom: "20px" }}>
                Hospital.com
              </h3>
              <p>
                Providing trusted healthcare services with compassion and
                innovation.
              </p>
              <div className="social-links mt-3">
                <a href="#" style={socialIconStyle}>
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" style={socialIconStyle}>
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" style={socialIconStyle}>
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" style={socialIconStyle}>
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-lg-2 col-md-6">
              <h5 style={{ color: "white", marginBottom: "15px" }}>
                Quick Links
              </h5>
              <ul style={{ listStyle: "none", padding: 0 }}>
                <li>
                  <a href="#" style={{ color: "rgba(255, 255, 255, 0.8)" }}>
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" style={{ color: "rgba(255, 255, 255, 0.8)" }}>
                    Our Services
                  </a>
                </li>
                <li>
                  <a href="#" style={{ color: "rgba(255, 255, 255, 0.8)" }}>
                    Doctors
                  </a>
                </li>
                <li>
                  <a href="#" style={{ color: "rgba(255, 255, 255, 0.8)" }}>
                    Appointments
                  </a>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div className="col-lg-2 col-md-6">
              <h5 style={{ color: "white", marginBottom: "15px" }}>
                Our Services
              </h5>
              <ul style={{ listStyle: "none", padding: 0 }}>
                <li>
                  <a href="#" style={{ color: "rgba(255, 255, 255, 0.8)" }}>
                    Emergency Care
                  </a>
                </li>
                <li>
                  <a href="#" style={{ color: "rgba(255, 255, 255, 0.8)" }}>
                    Online Consultation
                  </a>
                </li>
                <li>
                  <a href="#" style={{ color: "rgba(255, 255, 255, 0.8)" }}>
                    Lab Tests
                  </a>
                </li>
                <li>
                  <a href="#" style={{ color: "rgba(255, 255, 255, 0.8)" }}>
                    Health Packages
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="col-lg-4 col-md-6">
              <h5 style={{ color: "white", marginBottom: "15px" }}>
                Contact Us
              </h5>
              <ul style={{ listStyle: "none", padding: 0 }}>
                <li>
                  <i className="fas fa-map-marker-alt"></i> 123 Healthcare
                  Avenue, City
                </li>
                <li>
                  <i className="fas fa-phone-alt"></i> +1 (800) HEALTH-CARE
                </li>
                <li>
                  <i className="fas fa-envelope"></i> info@hospital.com
                </li>
                <li>
                  <i className="fas fa-clock"></i> 24/7 Emergency Services
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div style={bottomStyle}>
        <div className="container">
          <p style={{ color: "rgba(255, 255, 255, 0.8)", marginBottom: 0 }}>
            &copy; {new Date().getFullYear()} Hospital.com. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
