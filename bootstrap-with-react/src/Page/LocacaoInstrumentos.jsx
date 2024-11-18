import React from "react";
import { Container, Navbar, Nav, NavDropdown, Button, Image, InputGroup, Row, Col, Card } from 'react-bootstrap';
import { useNavigate, Link } from "react-router-dom";
import minipaLogo from '../Images/minipaLogo.png';
import { Form } from "react-bootstrap";
import categoriesList from '../CategoriesJSON/productCategory.json';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NewNav from "../Component/NewNav";
import FooterComponent from "../Component/FooterComponent";

export default function LocacaoInstrumentos() {
    const { categoryName, subcategoryName } = useParams();
    const [categoryData, setCategoryData] = useState(null);
    const [navData, setNavData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate("/");

    const data =
        [
            "ET-5061C",
            "ET-5062",
            "ET-4310",
            "MTR-1530",
            "ET-4055A"
        ]

    const path =
        [

            "/LocacaoImages/ET-5062.jpg",
            "/LocacaoImages/ET-4310.jpg",
            "/LocacaoImages/MTR-1530.jpg",
            "/LocacaoImages/ET-4055A.jpg"

        ]



    useEffect(() => {
        fetch(`https://json-server-vercel-tan-rho.vercel.app/categories`) // Trocar link  para Banco de dados //
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
            
            <Container>

            <div className="mt-3">
        <h1>Orçamento de Peças</h1>
        <p>
            Para solicitar o orçamento de peças do seu equipamento Minipa escreva para metrologia@minipa.com.br ou ligue para (11) 5078-1856.
        </p>
    </div>

                <h1 className="mt-3">Locacao Instrumentos </h1>
                <div>
                    A fim de atender as necessidades de nossos clientes com agilidade, qualidade e eficiência, a Minipa disponibiliza o serviço de locação de instrumentos. A locação é disponibilizada apenas para pessoas jurídicas através de contrato previamente assinado por ambas as partes.

                    Alguns instrumentos disponíveis para locação são:


                    <div className="mt-3">

                        <ul>
                            <li>ET-5061C - Analisador de Energia</li>
                            <li>ET-5062 - Analisador de Energia </li>
                            <li>ET-4310 - Alicate Terrômetro </li>
                            <li>MTR-1530 - Terrômetro Digital </li>
                            <li>ET-4055A - Alicate Wattímetro
                            </li>
                        </ul>
                    </div>

                    Consulte-nos sobre outros equipamentos disponíveis: metrologia@minipa.com.br
                </div>


                <div>
                    <h1>Conheça Nossos Instrumentos</h1>

                    <Row className="mt-4">
                        {data.map((category, index) => (
                            <Col key={index} sm={12} md={6} lg={4} className="mb-4 mb-2">
                                <Card>
                                <br />
                                <Image src={path[index]} fluid style={{ maxWidth: '200px', height: '300px', margin: '0 auto' }} />
                                    <Card.Body>
                                        <Card.Title>{category}</Card.Title>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>


            </Container>
            <FooterComponent />
        </div>


    )


}