import { Container, Navbar, Nav, NavDropdown, Table , Tabs , Tab } from 'react-bootstrap';
import { Row, Col, Button, Image, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Garantia = () => {

    return(
<div>
            <Container>

        <div className="mt-5 text-center">
        <h1>Contratar a Garantia Estendida</h1>
        <p>
            Para contratar a Garantia Estendida do seu equipamento Minipa escreva para metrologia@minipa.com.br ou ligue para (11) 5078-1856.
        </p>
        <h2> Sobre a Garantia</h2>
<p>Para pessoa física ou juridica, verifique no manual o CERTIFICADO DE GARANTIA e oberve se está dentro das condições normais de uso e manutenção. Alguns itens consumiveis não são cobertos pela garantia.</p>


<p>No menu ao lado, você encontra em REDE DE AUTORIZADAS uma parceira mais próxima para enviar seu equipamento. É indispensável o envio da cópia da NF de compra.</p>

<p>Equipamento sem o número de série, raspado, riscado ou violado não será aceito como dentro da garantia.</p>

<p>Caso queira enviar seu intrumento diretamente para a Assistência Técnica da Minipa
A Minipa do Brasil possui 2 unidades que também atendem todo o Brasil. Ao enviar para um dos endereços abaixo, e for Pessoa Juridica, o equipamento deve ser enviado com uma Nota de Remessa.</p>




    </div>
    
            </Container>
            </div>

    );
}

export default Garantia;