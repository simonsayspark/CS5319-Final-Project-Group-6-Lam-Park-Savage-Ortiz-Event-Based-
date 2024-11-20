import React from "react";
import { Card, Form } from "react-bootstrap";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Button,
  Row,
  Col,
  Image,
} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import minipaLogo from "../Images/minipaLogo.png";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { InputGroup } from "react-bootstrap";
import NewNav from "../Component/NewNav";
import FooterComponent from "../Component/FooterComponent";

export default function AboutUs() {
  const navigate = useNavigate();
  const { categoryName, subcategoryName } = useParams();
  const [categoryData, setCategoryData] = useState(null);
  const [navData, setNavData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/category`)
      .then((response) => response.json())
      .then((data) => {
        setNavData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="main-content">
      <NewNav navData={navData} />

      <Container className="mt-5 mb-5">
        <Row className="align-items-center my-4 bg-img">
          <div>
            <h1>Who Are We?</h1>
            <p>
              Our team is comprised on 4 people:
              <ul>
                <li>Tran Lam</li>
                <li>Simon Park</li>
                <li>Oliver Ortiz</li>
                <li>Ben Savage</li>
              </ul>
            </p>
          </div>
        </Row>

        <br />
        <Container class="col-lg-12 mt-5">
          <div class="horizontal-timeline">
            <h2> Our Journey </h2>

            <Row>
              <div>
                <p>
                  PawPaw Market's home branch is located in Dallas, Texas. We
                  have locations in 30 of the 50 contiguous states in the USA,
                  as well as locations in the UK, France, Spain, and Canada.
                </p>

                <p>
                  Our company offers over 50 products across 5 different
                  categories of animals. With over 200 credited distributors
                  across the 5 countries we are located in, we are a company
                  known for our quality products.
                </p>
              </div>
            </Row>
          </div>
        </Container>
        <br />

        <Row className="D-flex justify-center align-items-baseline">
          <Col md={6} className="text-center p-4">
            <h1>Our Mission</h1>
            <p>
              At PawPaw Market we wish to deliver high quality pet products to
              our customers, to ensure that their pets are able to live long,
              healthy lives.
            </p>
          </Col>

          <Col md={6}>
            <h1>Quality</h1>

            <p>
              All PawPaw Market products undergo rigorous testing to ensure high
              quality products. We only use products that we ourselves would
              feed our own pets, and have kept to this standard since we were
              established.
            </p>
          </Col>
        </Row>
      </Container>

      <FooterComponent />
    </div>
  );
}
