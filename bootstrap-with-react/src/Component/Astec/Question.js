import React from "react";
import { Container, Navbar, Nav, NavDropdown, Button, Image, InputGroup, Row, Col, Card, Placeholder, Accordion} from 'react-bootstrap';
import { useNavigate, Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Formu from "./Form";




const Question = () => {
    
    

    return (

        
            <Container className="text-center">
                <h1 className=" text-center">Perguntas Frequentes</h1>
                <br />
             <h2>Defeitos que pode solucionar</h2>
             <br />
<Accordion defaultActiveKey="0" className="mb-5">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Meu aparelho não liga</Accordion.Header>
        <Accordion.Body>
        Verifique a bateria ou as pilhas. Se for equipamentos de bancada, o fusível de entrada e o cabo de alimentação (alguns produtos saem com a chave de tensão em 220V).
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Não mede tensão</Accordion.Header>
        <Accordion.Body>
        Verifique se está na escala correta de tensão DC ou AC, verifique suas pontas de prova e o fusível de proteção.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Não mede corrente</Accordion.Header>
        <Accordion.Body>
        Nos multímetros, verifique o fusível de proteção. Nos alicates amperímetros, certifique se a corrente é DC ou AC, se a sua medida não é inferior a 1% da escala (EX.: escala de 1000 A 1% igual a 10 A).
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header>Não mede frequência de rede</Accordion.Header>
        <Accordion.Body>
        Somente os aparelhos que tem esta função pode medir.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="4">
        <Accordion.Header>Meu termômetro mira laser não aparece o laser</Accordion.Header>
        <Accordion.Body>
        Em alguns modelos da Minipa, você pode habilitar ou não esta função, verifique no manual.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="5">
        <Accordion.Header>Meu termômetro não mede corretamente</Accordion.Header>
        <Accordion.Body>
        Verifique a emissividade correspondente ao material que está medindo.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>

<br />

            </Container>
            );
}

export default Question;