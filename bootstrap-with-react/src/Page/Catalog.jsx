import React from "react";
import { Container, Navbar, Nav, NavDropdown, Button, Image, InputGroup, Row, Col, Card } from 'react-bootstrap';
import { useNavigate, Link } from "react-router-dom";
import minipaLogo from '../Images/minipaLogo.png';
import { Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import NewNav from "../Component/NewNav";
import FooterComponent from "../Component/FooterComponent";

export default function Catalog() {
  const [navData, setNavData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://json-server-vercel-tan-rho.vercel.app/categories`)
      .then(response => response.json())
      .then(data => {
        setNavData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const goHome = () => {
    navigate("/");
  }

  const pathToCatalog = "/Catalogs/CatálogoMinipa2024";
  const pathToCatalog2 = "/Catalogs/Catálogo Educacional Minipa_2023.pdf";
  const pathToCatalog3 = "/Catalogs/MINIPA - CATALOGO INDUSTRIAL -2022_2023 -  GUIA RPIDO.pdf";
  return (
    <div className="main-content">
      <NewNav navData={navData} />

      <Container>
        <h2 className="mt-5">Catálogos</h2>
        <Row className="mt-4">
          <Col sm={12} md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src="path-to-catalog1-image.jpg" />
              <Card.Body>
                <Card.Title>Catálogo Geral 2024</Card.Title>
                {/* <Card.Text>Download our latest catalog.</Card.Text> */}
                <Button className="mt-3 bg-red border-transparent border-0" href={pathToCatalog} download>Download</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src="path-to-catalog2-image.jpg" />
              <Card.Body>
                <Card.Title>Catálogo Industrial</Card.Title>
                {/* <Card.Text>Explore our wide range of products.</Card.Text> */}
                <Button className="mt-3 bg-red border-transparent border-0" href={pathToCatalog3} download>Download</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src="path-to-catalog3-image.jpg" />
              <Card.Body>
                <Card.Title>Catálogo Educacional</Card.Title>
                {/* <Card.Text>Find the perfect tools for your needs.</Card.Text> */}
                <Button className="mt-3 bg-red border-transparent border-0" href={pathToCatalog2} download>Download</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <FooterComponent/>
    </div>
  );
}
