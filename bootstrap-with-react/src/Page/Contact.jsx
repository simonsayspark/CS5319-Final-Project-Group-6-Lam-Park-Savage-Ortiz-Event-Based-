import React from "react";
import { Container, Navbar, Nav, NavDropdown, Button, Form, Row, Col, Card } from 'react-bootstrap';
import { useNavigate, Link } from "react-router-dom";
import minipaLogo from '../Images/minipaLogo.png';
import { useState, useEffect } from "react";
import { InputGroup } from "react-bootstrap";
import NewNav from "../Component/NewNav";
import FooterComponent from "../Component/FooterComponent";
import '../App.scss';
import Formu from "../Component/Astec/Form";


export default function Contact() {
    const navigate = useNavigate();
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

    const goHome = () => {
        navigate("/");
    }

    return (
      
            <div>
                <NewNav navData={navData} />
                <div className="main-content">
                    
       <Container id="Contact"  className="flex-row d-flex">
    <Col md={6}>
       <Formu/>
       </Col>
                    <Container  className=" d-flex text-center" style={{justifyContent:'center'}} >

                    <Col md={10}>
                        <Card className="mb-4 border-0" >
                                <Card.Body>
                                    <Card.Title>Contact Information</Card.Title>
                                    <Card.Text>
                                        <p>Informamos que a Minipa não comercializa produtos diretamente para o consumidor final, mas somente através dos nossos Distribuidores Autorizados.</p>
                                        <p>Localize a loja mais próxima de sua região clicando em <Link to="/OndeComprar">Onde Comprar</Link></p>
                                        <p>Fale com nosso SAC WhatsApp do SAC</p>
                                    </Card.Text>
                                </Card.Body>
                            </Card>

                              <Card className="mb-4 border-0">
                                
                                <Card.Body className="flex-row">
                                    <Card.Title className="mb-3">Escritórios Nacionais e Unidades Internacionais</Card.Title>
                                    <Card.Text> 
                                        
                                        <p><strong>Horário de atendimento:</strong><br />
                                            Segunda à Sexta: 8:00 às 17:40</p>
                                            <br />
                                            <Row md={3} className="text-center">
                                        <p><strong>Matriz - São Paulo</strong><br />
                                            Av. Carlos Liviero, 59<br />
                                            Vl. Liviero<br />
                                            São Paulo/SP<br />
                                            Cep:04186-100<br />
                                            (11) 5078-1850</p>
                                        <p><strong>Filial - Joinville SC</strong><br />
                                            Av Santos Dumont, 4401<br />
                                            Zona Industrial Norte<br />
                                            Joinville / SC<br />
                                            CEP 89219-730<br />
                                            (47) 3467-8444</p>
                                        <p><strong>Filial – Belo Horizonte MG</strong><br />
                                            Rua Morro da Graça, 371<br />
                                            Jd Montanhês – Belo Horizonte/MG<br />
                                            CEP 30730-670<br />
                                            (31) 2519-4550</p>
                                            </Row>
                                            <br />
                                            <Row md={2} className=" justify-center text-center">
                                            <p><strong>Unidade - Paraguai</strong><br />
                                            Representante Pargos Tech<br />
                                            Avda. Médicos del Chaco 2782<br />
                                            Asuncion<br />
                                            +595 21 551 313</p>
                                            <p><strong>Unidade - Equador</strong><br />
                                            Representante - Tecnimetro<br />
                                            Av. Galo Plaza Lasso N65-95 y Bellavista<br />
                                            Edificio Morb - 2ºpiso - Setor Parque de los Recuerdos<br />
                                            Quito<br />
                                            +593 02 6035811</p>
                                            </Row>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            </Col>
                        </Container>
                    </Container> 
                <FooterComponent />
            </div>
        </div>
    );
}
