import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate, Link, useParams } from "react-router-dom";
import minipaLogo from "../Images/minipaLogo.png";
// import NavbarComponent from '../Component/NavbarComponent';
import FooterComponent from "../Component/FooterComponent";
import NewNav from "../Component/NewNav";

export default function Products() {
  const { categoryName, subcategoryName } = useParams();
  const [categoryData, setCategoryData] = useState(null);
  const [navData, setNavData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  useEffect(() => {
    if (categoryName && navData.length > 0) {
      const formattedCategoryName = categoryName
        .replace(/-/g, " ")
        .toLowerCase();
      const category = navData.find(
        (cat) => cat.name.toLowerCase() === formattedCategoryName
      );

      if (category) {
        if (subcategoryName) {
          const formattedSubcategoryName = subcategoryName
            .replace(/-/g, " ")
            .toLowerCase();
          const subcategory = category.subcategories.find(
            (subcat) => subcat.name.toLowerCase() === formattedSubcategoryName
          );

          if (subcategory) {
            setCategoryData({ ...category, currentSubcategory: subcategory });
          } else {
            console.error(`Subcategory not found: ${subcategoryName}`);
            setCategoryData(category);
          }
        } else {
          setCategoryData(category);
        }
      } else {
        console.error(`Category not found: ${categoryName}`);
      }
    } else {
      setCategoryData(null);
    }
  }, [categoryName, subcategoryName, navData]);

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="main-content">
      <div>
        {/* <NavbarComponent navData={navData} /> */}
        <NewNav navData={navData} />
        <Container>
          <h2 className="mt-5">Products Page</h2>

          {loading ? (
            <div>Loading... hellop</div>
          ) : (
            <Row className="mt-4">
              {navData.map((category, index) => (
                <Col key={index} sm={12} md={6} lg={5} className="Card-produt">
                  <Card>
                    <Card.Img
                      variant="top"
                      src={category.image || "path-to-default-image.jpg"}
                    />
                    <Card.Body>
                      <Card.Title>{category.name}</Card.Title>
                      <Card.Text>{category.description}</Card.Text>
                      <Link
                        to={`/category/${category.name
                          .toLowerCase()
                          .replace(/ /g, "-")}`}
                      >
                        <Button className="mt-3 bg-red border-transparent border-0">
                          View More
                        </Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
          <Button onClick={goHome}>Back</Button>
        </Container>

        <FooterComponent />
      </div>
    </div>
  );
}
