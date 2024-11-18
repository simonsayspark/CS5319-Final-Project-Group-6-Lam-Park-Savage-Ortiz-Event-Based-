import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Row,
  Col,
  Card,
  Carousel,
  Placeholder,
  Button,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import "../App.scss";
// import NavbarComponent from '../Component/NavbarComponent';
import FooterComponent from "../Component/FooterComponent";
import NewNav from "../Component/NewNav";

export default function LandingPage() {
  const { categoryName, subcategoryName } = useParams();
  const [categoryData, setCategoryData] = useState([]);
  const [navData, setNavData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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

  const getChunkSize = () => {
    if (windowWidth < 360) return 1;
    if (windowWidth < 576) return 2;
    if (windowWidth < 780) return 3;
    if (windowWidth < 1270) return 4;
    return 5;
  };

  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const chunkedData = chunkArray(navData, getChunkSize());

  const getCategoryImagePath = (categoryName) => {
    const formattedName = categoryName
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/,/g, "");

    return `${process.env.PUBLIC_URL}/categories/${formattedName}.jpg`;
  };

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <NewNav navData={navData} />
      <Carousel
        className="justify-content-center mt-5 mb-5 w-100"
        style={{ maxHeight: "" }}
      >
        <Carousel.Item className="justify-content-center mt-5 w-100">
          <Col className="mb-4 mt-5" style={{ maxHeight: "800px" }}>
            <img src="homepage2.jpg" width={"100%"} alt="" />
          </Col>
        </Carousel.Item>
        <Carousel.Item className="justify-content-center mt-5 w-100">
          <Col
            className="mb-4 mt-5"
            style={{ maxHeight: "800px", width: "100%" }}
          >
            <img src="homepage1.jpg" width={"100%"} alt="" />
          </Col>
        </Carousel.Item>
        <Carousel.Item className="justify-content-center mt-5 w-100">
          <Col
            className="mb-4 mt-5"
            style={{ maxHeight: "800px", width: "100%" }}
          >
            <img src="homepage3.jpg" width={"100%"} alt="" />
          </Col>
        </Carousel.Item>
        <Carousel.Item className="justify-content-center mt-5 w-100">
          <Col
            className="mb-4 mt-5"
            style={{ maxHeight: "800px", width: "100%" }}
          >
            <img src="homepage4.jpg" width={"100%"} alt="" />
          </Col>
        </Carousel.Item>
      </Carousel>

      <Container>
        <h2 className="text-center mt-5 mb-5">Featured Products</h2>
        <Carousel
          interval={null}
          indicators={false}
          controls={true}
          id="line-products"
          className="m-4"
        >
          {chunkedData.map((categoryChunk, index) => (
            <Carousel.Item key={index}>
              <Row className="justify-content-center mt-5 ">
                {categoryChunk.map((category, categoryIndex) => (
                  <Col
                    key={categoryIndex}
                    xs={5}
                    sm={4}
                    md={2}
                    className="mb-4"
                  >
                    <Card
                      id="line"
                      className="text-center background-none shadow bg-body-tertiary rounded d-flex justfy-center zoom-effect-container border-0 mb-5"
                    >
                      <Link
                        to={`/category/${category.name
                          .toLowerCase()
                          .replace(/ /g, "-")}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <Card.Img
                          variant="top"
                          src={getCategoryImagePath(category.name)}
                          style={{ maxHeight: "100px", objectFit: "fill" }}
                        />
                        <Card.Body className="line">
                          <Card.Title>{category.name}</Card.Title>
                        </Card.Body>
                      </Link>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>

     

      <FooterComponent />
    </div>
  );
}
