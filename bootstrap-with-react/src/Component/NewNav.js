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
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is logged in
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

  const handleMouseEnterDropdown = () => {
    setShowDropdown(true);
  };

  const handleMouseLeaveDropdown = () => {
    setShowDropdown(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    window.location.reload();
  };

  return (
    <div>
      <Navbar className="top-navbar pt-4">
        <Container fluid className="d-flex justify-content-between"></Container>
      </Navbar>

      <Navbar expand="lg" className="main-navbar">
        <Container className="logo">
          <div className="pl-3">
            <Navbar.Brand href="#" className="navbar-brand">
              <img src={minipaLogo} alt="Logo" />
            </Navbar.Brand>
          </div>
        </Container>

        <Container>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav">
            <Nav className="ms-auto m-3 align-items-center">
              <Nav.Item>
                <Nav.Link href="/" className="text-black">
                  Home
                </Nav.Link>
              </Nav.Item>
              <Nav.Item
                onMouseEnter={handleMouseEnterMegaMenu}
                onMouseLeave={handleMouseLeaveMegaMenu}
                className="position-relative"
              >
                <Nav.Link href="#" className="text-black">
                  Products
                </Nav.Link>
                {showMegaMenu && <MegaMenu categories={navData} />}
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="text-black" href="/SobreNos">
                  About Us
                </Nav.Link>
              </Nav.Item>

              {/* Log In / User Icon */}
              {isLoggedIn ? (
                <>
                  {/* Shopping Cart Icon */}
                  <Nav.Item style={{ paddingLeft: "20px" }}>
                    <Nav.Link as={Link} to="/Cart">
                      <FiShoppingCart className="text-black" size={24} />
                    </Nav.Link>
                  </Nav.Item>

                  {/* User Icon with Dropdown */}
                  <NavDropdown
                    title={<FiUser className="text-black" size={24} />}
                    id="user-dropdown"
                    align="end"
                    className="p-4"
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
                  <Nav.Link href="/Login">
                    <button className="btn btn-primary text-white">
                      Log In
                    </button>
                  </Nav.Link>
                </Nav.Item>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NewNav;
