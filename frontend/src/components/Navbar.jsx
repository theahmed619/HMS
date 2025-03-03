import React, { useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Dropdown,
  Container,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const [user, setUser] = useState(null); // Store user details
  const navigate = useNavigate();

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse and set user
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user from local storage
    setUser(null);
    navigate("/"); // Redirect to home after logout
  };

  return (
    <Navbar bg="dark" expand="lg" className="navbar-dark px-3">
      <Navbar.Brand as={Link} to="/" className="text-white">
        <i className="fa-sharp fa-solid fa-hospital"></i> HMS
      </Navbar.Brand>

      <Form className="d-flex ms-auto me-3">
        <FormControl type="search" placeholder="Search..." className="me-2" />
        <Button variant="light">
          <i className="fas fa-search"></i>
        </Button>
      </Form>

      <Nav className="ms-auto">
        <Link to="/payment" className="nav-link text-white">
          <i className="fas fa-credit-card"></i> PAY NOW
        </Link>

        {!user ? (
          <>
            <Link to="/admin-login" className="nav-link text-white">
              <i className="fa-solid fa-user-shield"></i> ADMIN
            </Link>
            <Link to="/doctor-login" className="nav-link text-white">
              <i className="fas fa-user-md"></i> DOCTOR
            </Link>
            <Link to="/appointment" className="nav-link text-white">
              <i className="fa fa-book"></i> APPOINTMENT
            </Link>
            <Link to="/user-login" className="nav-link text-white">
              <i className="fas fa-user"></i> USER
            </Link>
          </>
        ) : (
          <>
            <Link to="/book-appointment" className="nav-link text-white">
              <i className="fa fa-book"></i> APPOINTMENT
            </Link>
            <Link to="/view-appointment" className="nav-link text-white">
              <i className="fa fa-calendar-check"></i> VIEW APPOINTMENT
            </Link>

            <Dropdown align="end">
              <Dropdown.Toggle variant="dark" className="text-white">
                <i className="fa-solid fa-circle-user"></i> {user.fullName}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/change-password">
                  Change Password
                </Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </>
        )}
      </Nav>
    </Navbar>
  );
};

export default NavBar;
