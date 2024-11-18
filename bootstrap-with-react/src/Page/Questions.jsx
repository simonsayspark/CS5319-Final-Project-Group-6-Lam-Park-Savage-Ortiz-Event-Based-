import React from "react";
import { Container, Navbar, Nav, NavDropdown, Button, Image, InputGroup, Row, Col, Card, Placeholder, Accordion} from 'react-bootstrap';
import { useNavigate, Link } from "react-router-dom";
import minipaLogo from '../Images/minipaLogo.png';
import { Form } from "react-bootstrap";
import categoriesList from '../CategoriesJSON/productCategory.json';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import NavbarComponent from "../Component/NavbarComponent";
import FooterComponent from "../Component/FooterComponent";

export default function Questions() {
    const { categoryName, subcategoryName } = useParams();
    const [categoryData, setCategoryData] = useState(null);
    const [navData, setNavData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate("/");

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

    useEffect(() => {
        if (categoryName && navData.length > 0) {
            const formattedCategoryName = categoryName.replace(/-/g, ' ').toLowerCase();
            const category = navData.find(cat => cat.name.toLowerCase() === formattedCategoryName);

            if (category) {
                if (subcategoryName) {
                    const formattedSubcategoryName = subcategoryName.replace(/-/g, ' ').toLowerCase();
                    const subcategory = category.subcategories.find(subcat => subcat.name.toLowerCase() === formattedSubcategoryName);

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


    return (
        <div className="main-content">
            {/* <NavbarComponent navData={navData} /> */}
            <Container className="text-center">
                <h1 className="mt-5 text-center">Perguntas Frequentes</h1>
                <br />
             <h2>Defeitos que pode solucionar</h2>
             <br />
<Accordion defaultActiveKey="0" className="mb-5">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Accordion Item #1</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Accordion Item #2</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Accordion Item #2</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header>Accordion Item #2</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="4">
        <Accordion.Header>Accordion Item #2</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
<h2> Sobre a Garantia</h2>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint ratione libero quidem recusandae, ab fugiat quis saepe labore, in aliquid, ipsa sed! Laudantium laborum impedit maiores, adipisci eos vel quos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint ratione libero quidem recusandae, ab fugiat quis saepe labore, in aliquid, ipsa sed! Laudantium laborum impedit maiores, adipisci eos vel quos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint ratione libero quidem recusandae, ab fugiat quis saepe labore, in aliquid, ipsa sed! Laudantium laborum impedit maiores, adipisci eos vel quos.</p>

<br />
                <h2 className="mb-3">Caso ainda haja duvidas...</h2>

                <Form className="mb-4 mt-2" >
                                <Form.Group controlId="formName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter your name" />
                                </Form.Group>
                                <Form.Group controlId="formEmail" className="mt-3">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter your email" />
                                </Form.Group>
                                <Form.Group controlId="formSubject" className="mt-3">
                                    <Form.Label>Subject</Form.Label>
                                    <Form.Control type="text" placeholder="Subject" />
                                </Form.Group>
                                <Form.Group controlId="formMessage" className="mt-3">
                                    <Form.Label>Message</Form.Label>
                                    <Form.Control as="textarea" rows={4} placeholder="Your message" />
                                </Form.Group>
                                <Button className="mt-3 bg-red border-transparent border-0" type="submit">
                                    Submit
                                </Button>
                            </Form> 

            </Container>
            <FooterComponent/>
        </div>


    )


}