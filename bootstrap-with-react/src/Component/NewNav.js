import React, { useEffect, useState } from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FiUser, FiShoppingCart } from "react-icons/fi";
import minipaLogo from "../Images/minipaLogo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.scss";
import "./Nav.scss";
import MegaMenu from "./MegaMenu";

const NewNav = ({ navData }) => {
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleMouseEnterMegaMenu = () => {
    setShowMegaMenu(true);
  };

  const handleMouseLeaveMegaMenu = () => {
    setShowMegaMenu(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    window.location.reload();
  };

  return (
    <Navbar expand="lg" bg="white" className="shadow-sm py-3">
      <Container>
        {/* Logo */}
        <Navbar.Brand href="#" className="navbar-brand">
          <img
            src={minipaLogo}
            alt="Logo"
            style={{ height: "60px", width: "auto" }}
          />
        </Navbar.Brand>

        {/* Toggle Button for Mobile View */}
        <Navbar.Toggle aria-controls="navbarNav" />

        <Navbar.Collapse id="navbarNav">
          <Nav className="ms-auto align-items-center">
            {/* Home Link */}
            <Nav.Item>
              <Nav.Link as={Link} to="/" className="text-dark fw-semibold">
                Home
              </Nav.Link>
            </Nav.Item>

            {/* Products with Mega Menu */}
            <Nav.Item
              onMouseEnter={handleMouseEnterMegaMenu}
              onMouseLeave={handleMouseLeaveMegaMenu}
              className="position-relative"
            >
              <Nav.Link className="text-dark fw-semibold" href="#">
                Products
              </Nav.Link>
              {showMegaMenu && <MegaMenu categories={navData} />}
            </Nav.Item>

            {/* About Us Link */}
            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/SobreNos"
                className="text-dark fw-semibold"
              >
                About Us
              </Nav.Link>
            </Nav.Item>

            {/* User Section */}
            {isLoggedIn ? (
              <>
                {/* Shopping Cart Icon */}
                <Nav.Item className="ms-3">
                  <Nav.Link as={Link} to="/Cart">
                    <FiShoppingCart className="text-dark" size={22} />
                  </Nav.Link>
                </Nav.Item>

                {/* User Dropdown */}
                <NavDropdown
                  title={<FiUser className="text-dark" size={22} />}
                  id="user-dropdown"
                  align="end"
                >
                  <NavDropdown.Item as={Link} to="/Profile">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}>
                    Log Out
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <Nav.Item>
                <Nav.Link as={Link} to="/Login">
                  <button className="btn btn-primary text-white fw-bold">
                    Log In
                  </button>
                </Nav.Link>
              </Nav.Item>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NewNav;
