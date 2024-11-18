import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";


const FooterComponent = () => {
  return (
    <footer className="main-background text-white py-4">
      <Container>
        <Row className="mb-5">
          <Col md={2}>
            <h5>Shop by Category</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white">Dog Supplies</a></li>
              <li><a href="#" className="text-white">Cat Supplies</a></li>
              <li><a href="#" className="text-white">Bird Supplies</a></li>
              <li><a href="#" className="text-white">Small Pet Supplies</a></li>
              <li><a href="#" className="text-white">Aquarium & Fish</a></li>
              <li><a href="#" className="text-white">Reptile Supplies</a></li>
              <li><a href="#" className="text-white">Pet Grooming</a></li>
              <li><a href="#" className="text-white">Food & Treats</a></li>
              <li><a href="#" className="text-white">Toys & Accessories</a></li>
            </ul>
          </Col>
          <Col md={2}>
            <h5>Services</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white">Pet Grooming</a></li>
              <li><a href="#" className="text-white">Veterinary Care</a></li>
              <li><a href="#" className="text-white">Adoption Services</a></li>
              <li><a href="#" className="text-white">Training Classes</a></li>
            </ul>
          </Col>
          <Col md={2}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white">Find a Store</a></li>
              <li><a href="#" className="text-white">Contact Us</a></li>
              <li><a href="#" className="text-white">Careers</a></li>
              <li><a href="#" className="text-white">Gift Cards</a></li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Newsletter</h5>
            <Form>
              <Form.Group controlId="formNewsletter">
                <Form.Control type="email" placeholder="Email" />
              </Form.Group>
              <Button type="submit" className="mt-3 bg-red border-transparent border-0">
                Subscribe
              </Button>
            </Form>
          </Col>
          <Col md={3} className="text-center">
            <img src={"pawpaw.png"} alt="PawPaw Logo" style={{ height: "90px" }} />
            <p>Your one-stop marketplace for happy pets!</p>
            <div className="d-flex justify-content-center text-center">
              <a href="#" className="text-white mx-2"><i className="fa fa-facebook"></i></a>
              <a href="#" className="text-white mx-2"><i className="fa fa-youtube"></i></a>
              <a href="#" className="text-white mx-2"><i className="fa fa-linkedin"></i></a>
              <a href="#" className="text-white mx-2"><i className="fa fa-instagram"></i></a>
            </div>
          </Col>
        </Row>

        <Row className="text-center">
          <p>© 2025 - PawPaw Marketplace. All Rights Reserved.</p>
        </Row>
      </Container>
    </footer>
  );
};

export default FooterComponent;
