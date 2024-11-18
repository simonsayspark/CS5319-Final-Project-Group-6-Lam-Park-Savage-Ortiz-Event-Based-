import React from "react";
import { Container, Row, Col, Nav, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const MegaMenu = ({ categories }) => {
  return (
    <div className="mega-menu">
      <Dropdown>
        <Container>
          <Row>
            {categories.map((category, index) => (
              <Col key={index} md={3} className="category-column">
                <div className="text-uppercase mb-3 subcategory-link">
                  {/* Category Name */}
                  <div className="text-uppercase mb-3 subcategory-link">
                    <Link
                      to={`/category/${category.name
                        .toLowerCase()
                        .replace(/ /g, "-")}`}
                      className="text-decoration-none text-dark"
                    >
                      {category.name}
                    </Link>
                  </div>
                </div>
                <Nav className="flex-column subcategory-nav subcategory-link">
                  {category.subcategory ? (
                    // Extract and map animal types (e.g., dog, cat, fish, bird, reptile)
                    Object.keys(category.subcategory).map(
                      (animalType, subIndex) => (
                        <Nav.Link
                          key={subIndex}
                          as={Link}
                          to={`/category/${category.name
                            .toLowerCase()
                            .replace(/ /g, "-")}/${animalType.toLowerCase()}`}
                        >
                          {animalType.charAt(0).toUpperCase() +
                            animalType.slice(1)}
                        </Nav.Link>
                      )
                    )
                  ) : (
                    <Nav.Link
                      as={Link}
                      to={`/category/${category.name
                        .toLowerCase()
                        .replace(/ /g, "-")}`}
                    >
                      {category.name}
                    </Nav.Link>
                  )}
                </Nav>
              </Col>
            ))}
          </Row>
        </Container>
      </Dropdown>
    </div>
  );
};

export default MegaMenu;
