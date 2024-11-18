import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { useNavigate, useParams, Link } from "react-router-dom";
import NewNav from "../Component/NewNav";
import FooterComponent from "../Component/FooterComponent";

export default function LabCollab() {
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
            <Container className="mt-5">
                <h1 className="mb-1">Calibração</h1>
                <h3 className="mb-2">Tipos de Calibração</h3>
                <Row className="mb-4">
                    <Col md={2} className="text-center">
                        <Image src="https://via.placeholder.com/150" roundedCircle />
                        <h5 className="mt-2 mb-2" >Elétrica</h5>
                        <ul className="list-unstyled">
                            <li>Multímetro Digital</li>
                            <li>Multímetro Analógico</li>
                            <li>Alicate de Corrente</li>
                            <li>Megôhmetro</li>
                            <li>Terrômetro</li>
                        </ul>
                    </Col>
                    <Col md={2} className="text-center">
                        <Image src="https://via.placeholder.com/150" roundedCircle />
                        <h5 className="mt-2 mb-2" >Eletro-Acústica</h5>
                        <ul className="list-unstyled">
                            <li>Decibelímetro</li>
                            <li>Não efetuamos calibração em microfone</li>
                        </ul>
                    </Col>
                    <Col md={2} className="text-center">
                        <Image src="https://via.placeholder.com/150" roundedCircle />
                        <h5 className="mt-2 mb-2">Temperatura</h5>
                        <ul className="list-unstyled">
                            <li>Termômetro Digital</li>
                            <li>Termo-Higrômetro</li>
                            <li>Termômetro Infravermelho</li>
                            <li>Termômetro Vareta</li>
                        </ul>
                    </Col>
                    <Col md={2} className="text-center">
                        <Image src="https://via.placeholder.com/150" roundedCircle />
                        <h5 className="mt-2 mb-2" >Dimensional</h5>
                        <ul className="list-unstyled">
                            <li>Paquímetro</li>
                            <li>Trena Laser</li>
                            <li>Micrômetro</li>
                        </ul>
                    </Col>
                    <Col md={2} className="text-center">
                        <Image src="https://via.placeholder.com/150" roundedCircle />
                        <h5 className="mt-2 mb-2" >Pressão</h5>
                        <ul className="list-unstyled">
                            <li>Manômetro</li>
                            <li>Vacúometro</li>
                        </ul>
                    </Col>
                    <Col md={2} className="text-center">
                        <Image src="https://via.placeholder.com/150" roundedCircle />
                        <h5 className="mt-2 mb-2">Outros</h5>
                        <ul className="list-unstyled m-2 ">
                            <li>Medidor de Espessura</li>
                            <li>Calibrador de Processos</li>
                            <li>Fonte de Alimentação</li>
                        </ul>
                    </Col>
                </Row>
                <br />
                <Row className="mb-4">
                    <Col md={4}>
                        <Image src="https://via.placeholder.com/500" thumbnail />
                    </Col>
                    <Col md={8}>
                        <h3>Laboratório de Calibração</h3>
                        <p>
                            Nosso Laboratório de Calibração é responsável pela calibração de equipamentos e certificação dos mesmos. Coletamos as medidas dos instrumentos e as comparamos a padrões de calibração para assegurar suas precisões. Todas as atividades são realizadas em conformidade com a Norma ABNT NBR ISO / IEC 17025, oferecendo aos clientes segurança nos valores obtidos, permitindo ao usuário a confiabilidade em seu equipamento.
                        </p>
                        <p>
                            A Minipa é o primeiro fabricante nacional de instrumentos de medição eletroeletrônicos a possuir um Laboratório de Calibração acreditado à Rede Brasileira de Calibração - RBC/Inmetro, desde maio de 2005.
                        </p>
                        <p>
                            Temos laboratórios próprios nas áreas de Dimensional, Pressão, Temperatura, Elétrica e Eletroacústica. Realizamos calibrações em Paquímetros, Micrômetros, Manômetros e Vacuômetros, todos em conformidade com a norma ISO/IEC 17025:2005.
                        </p>
                        <Button className="mt-3 bg-red border-transparent border-0" href="link-to-certificado">
                            Clique aqui para download do Certificado RBC
                        </Button>
                    </Col>
                </Row>
            </Container>
            <FooterComponent />
        </div>
    );
}
