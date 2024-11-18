import { Container, Navbar, Nav, NavDropdown, Table , Tabs , Tab } from 'react-bootstrap';
import { Row, Col, Button, Image, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.scss';



const AssTech = () => {

    return(
<Container className="mt-5 justify-center text-center ">
    <Row>
        <Col>
            <h1 className="mb-2">Sobre a Assistência Técnica</h1>
            <p>
                Nosso departamento de Assistência Técnica (ASTEC) e nossa Rede de Autorizadas estão preparados para oferecer um serviço de manutenção de qualidade para seu instrumento de medição, além de fornecer peças e acessórios originais. Assim, garantimos a satisfação e o bom atendimento de nossos clientes, visando sempre uma parceria de respeito e confiança.
            </p>
            <p>
                Antes de encaminhar o equipamento para conserto, verifique se o mesmo está Dentro ou Fora da Garantia. Acesse “Perguntas Frequentes” e saiba como proceder.
            </p>

            <h2 className="mt-3 mb-2 text-center ">Posto de Coleta Minipa</h2>

        <Container className="d-flex flex-colunm justify-center">
    

            <Card id='astec' className='text-center border-0 m-3 shadow'>
            <h3 className="m-4">O que é um posto de coleta Minipa?</h3>
            <p className='m-1'>
                O posto de coleta Minipa é um local onde você pode deixar seus equipamentos dentro e fora da garantia para manutenção.
            </p>
            </Card>

            <Card id='astec' className='text-center m-3 border-0 shadow '>
            <h4 className="mt-4">ATENÇÃO!</h4>
            <ul>
                <li>Em nosso posto de coleta não é realizada nenhuma análise no instrumento.</li>
                <li>Prazo para manutenção de equipamento em garantia 30 dias.</li>
                <li>Prazo para envio de orçamento (equipamento fora de garantia) 10 dias úteis.</li>
            </ul>
            </Card>

            <Card id='astec' className='text-center border-0 m-3 shadow'>
            <h3 className="mt-4">Como funciona o posto de coleta Minipa?</h3>
            <p className='m-1'>
                Você leva seu equipamento até o posto de coleta com o formulário preenchido e comunica a Minipa.
            </p>
            </Card>



      </Container>



            <Button className="mt-4 mb-4 bg-red border-transparent border-0 justify-center ">
                <Image src="path-to-whatsapp-icon.png" width="20" height="20" className="me-2" />
                WhatsApp Técnico
            </Button>


        </Col>
    </Row>
    {/* <Row>

        <Col>
            <Image src="path-to-your-image.jpg" fluid className="mt-4" />
        </Col>

    </Row> */}


</Container>

);
    }

export default AssTech;