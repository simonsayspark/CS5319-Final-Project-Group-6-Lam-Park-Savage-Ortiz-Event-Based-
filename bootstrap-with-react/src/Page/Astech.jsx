import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Image, Card } from 'react-bootstrap';
import { useNavigate, Link, useParams } from "react-router-dom";
import NewNav from "../Component/NewNav";
import FooterComponent from "../Component/FooterComponent";
import NavAss from "../Component/NavAss";
import AssTech from "../Component/Astec/astec";
import Garantia from "../Component/Astec/Garantia"
import RedeAuto from "../Component/Astec/redesAuto"
import Question from "../Component/Astec/Question";
import Formu from "../Component/Astec/Form";


export default function Astech() {
    const navigate = useNavigate();
    const { categoryName, subcategoryName } = useParams();
    const [categoryData, setCategoryData] = useState(null);
    const [navData, setNavData] = useState([]);
    const [loading, setLoading] = useState(true);

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
            <NewNav navData={navData} />
            <NavAss/>
     <Container>
                <AssTech/>
                <Question/>
                <Garantia/>
                <RedeAuto/>
                <br />
                <div className="justfy-center">
                <Formu/>
                </div>
    </Container>

            <FooterComponent />
        </div>
    );
}
