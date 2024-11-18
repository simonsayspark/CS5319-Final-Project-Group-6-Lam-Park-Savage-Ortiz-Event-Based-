import React from "react";
import { Card, Form } from "react-bootstrap";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Button,
  Row,
  Col,
  Image,
} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import minipaLogo from "../Images/minipaLogo.png";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { InputGroup } from "react-bootstrap";
import NewNav from "../Component/NewNav";
import FooterComponent from "../Component/FooterComponent";

export default function AboutUs() {
  const navigate = useNavigate();
  const { categoryName, subcategoryName } = useParams();
  const [categoryData, setCategoryData] = useState(null);
  const [navData, setNavData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://json-server-vercel-tan-rho.vercel.app/categories`)
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
      <NewNav navData={navData} />

      <Container className="mt-5 mb-5">
        <Row className="align-items-center my-4 bg-img">
          <div>
            <h1>Dorem ipsum dolor </h1>
            <p>
              A empresa possui filiais em Joinville (SC), Belo Horizonte (MG),
              além de presença internacional com representantes e distribuidores
              em países como como Paraguai, Colômbia, Peru, Equador, México,
              Uruguai e América Central.
            </p>
          </div>
        </Row>

        <br />
        <Container class="col-lg-12 mt-5">
          <div class="horizontal-timeline">
            <h2> Nossa Trajetória </h2>

            <Row>
              <div>
                <iframe
                  width="555"
                  height="312"
                  src="https://www.youtube.com/embed/IFzyA-iz1ko"
                  title="Minipa do Brasil Institucional"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                ></iframe>
              </div>

              <div>
                <p>
                  A empresa possui filiais em Joinville (SC), Belo Horizonte
                  (MG), além de presença internacional com representantes e
                  distribuidores em países como como Paraguai, Colômbia, Peru,
                  Equador, México, Uruguai e América Central.
                </p>

                <p>
                  A Minipa do Brasil é referência em Multímetros e Alicates
                  Amperímetros, oferecemos mais de 250 produtos para
                  comercialização. Com mais de 800 distribuidores credenciados
                  em todos os estados do Brasil, Somos uma empresa reconhecida
                  pela excelência tecnológica, suporte ao usuário e incentivo à
                  educação e à formação técnica de estudantes.
                </p>
              </div>
            </Row>
          </div>
        </Container>
        <br />

        <Row className="D-flex justify-center align-items-baseline">
          <Col md={6} className="text-center p-4">
            <h1>Nossa Missão</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
              corrupti ratione aspernatur enim voluptate consectetur similique
              magni, ex animi laborum eius nisi ducimus doloribus suscipit
              iusto, optio tempore quibusdam. Dolorem?
            </p>
          </Col>

          <Col md={6}>
            <h1>Qualidade</h1>

            <p>
              {" "}
              Todos os instrumentos de medição da Minipa passam por um rigoroso
              controle de qualidade. Inspecionamos os produtos um a um e,
              somente os aprovados por nossos técnicos, são comercializados e
              entregues aos nossos distribuidores em todo país. A Minipa é a
              primeira empresa brasileira no setor de instrumentos de medição a
              obter a certificação ISO 9001, graças ao envolvimento e empenho de
              seus colaboradores. Esse diferencial garante a qualidade nos
              processos e a melhoria contínua de nossos produtos e serviços,
              resultando na satisfação de nossos clientes usuários.
            </p>
          </Col>
        </Row>
      </Container>

      <Container className="mt-5 d-flex justify-center">
        <Row className=" aling-itens-center text-center">
          <h2 className="justify-center mt-3 mb-5">Empresas do grupo</h2>
          <Col md={4} className="">
            <Card className="border-0">
              <img
                src="https://www.minipa.com.br/images/2021/06/10/logo_minipaelectric.png"
                style={{ maxWidth: "300px", margin: "auto" }}
                alt=""
              />
            </Card>
          </Col>
          <Col md={4} className="">
            <Card className="border-0">
              <img
                src="https://www.minipa.com.br/images/2021/06/14/minipa-iot-logo-oficial-azul.png"
                style={{ maxWidth: "300px", margin: "auto" }}
                alt=""
              />
            </Card>
          </Col>
          <Col md={4} className="">
            <Card className="border-0">
              <img
                src="https://www.minipa.com.br/images/2021/06/14/new-prots-oficial---2020.png"
                style={{ maxWidth: "300px", margin: "auto" }}
                alt=""
              />
            </Card>
          </Col>
        </Row>
      </Container>

      <Container></Container>

      <Container className="d-flex justify-center">
        <Row
          flui
          className="text-center d-flex flex-row "
          style={{ justifyContent: "center" }}
        >
          <h2 className="mt-5">Parceiros</h2>

          <Col md={5} className="text-center mt-4 mb-4">
            <Card className="border-0 shadow" style={{ alignItems: "center" }}>
              <Image
                src="https://www.minipa.com.br/images/2016/11/01/logo_centropaulasouza.jpg"
                style={{ width: "80%" }}
                className="mb-4"
                fluid
                rounded
              />
              <p>
                Parceiros na realização da Maratona Eletrônica Minipa e
                incentivo à formação do profissional do amanhã.
              </p>
            </Card>
          </Col>

          <Col md={5} className="text-center mt-4 mb-4 d-flex ">
            <Card className="border-0 shadow" style={{ alignItems: "center" }}>
              <Image
                src="https://www.minipa.com.br/images/2016/11/01/logo_cienciashow.jpg"
                style={{
                  width: "80%",
                  justifyContent: "center",
                  display: "flex",
                }}
                className="mb-4"
                fluid
                rounded
              />
              <p>
                Parceiros na realização de experiências com instrumento Minipa e
                na divulgação da nossa marca em todo o Brasil.
              </p>
            </Card>
          </Col>
        </Row>
      </Container>

      <FooterComponent />
    </div>
  );
}
