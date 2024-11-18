import React from "react";
import { Container, Navbar, Nav, NavDropdown, Button, Image, InputGroup, Row, Col, Card } from 'react-bootstrap';
import { useNavigate, Link } from "react-router-dom";
import minipaLogo from '../Images/minipaLogo.png';
import { Form } from "react-bootstrap";
import categoriesList from '../CategoriesJSON/productCategory.json';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import NavbarComponent from "../Component/NavbarComponent";
import FooterComponent from "../Component/FooterComponent";

export default function WhereToBuy() {
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

    const goHome = () => {

        navigate("/");
    }

    return (
        <div className="main-content">
            {/* <NavbarComponent navData={navData} /> */}
            <Container>
                <h2 className="mt-5">This is the Where to buy page</h2>
                
            </Container>
            <FooterComponent/>
        </div>


    )


}