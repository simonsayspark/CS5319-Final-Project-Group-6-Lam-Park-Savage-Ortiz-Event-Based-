import React from "react";
import { Container, Navbar, Nav, NavDropdown, Button, Image, InputGroup, Row, Form, Col, Card, Placeholder, Accordion} from 'react-bootstrap';
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form"


const Formu = () =>{


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();
    

      const onSubmit = (data) => {
        console.log(data);
      };

return(
    
<div className="d-flex no-wrap" style={{justifyContent:'center'}}>
<Container className="text-center d-flex flex-column" style={{alignItems:'center'}}>
    
<h1>Mais Informações</h1>
<Col style={{ width:'50%'}}>
<br />
<Form className="" 
onSubmit={handleSubmit(onSubmit)}
name="Form" style={{maxHeight:'30%'}}
>


    

<Form.Group>
    <Form.Label>Name</Form.Label>
<Form.Control 
    {...register("FormName", { required: 'Este campo é obrigatório' })}
    id="FormName"
    type="text" 
    placeholder="Enter your name"  
  />
  {errors.FormName && <p>{errors.FormName.message}</p>}
</Form.Group>




<Form.Group className="mt-3" >
    <Form.Label>Email address</Form.Label>
    <Form.Control  

{...register("FormEmail", { required: 'Este campo é obrigatório' })}
id="FormEmail"  
 type="email"
placeholder="Enter your Email"  
/>
{errors.FormEmail && <p>{errors.FormEmail.message}</p>}
</Form.Group>





<Form.Group  className="mt-3">
    <Form.Label>Subject</Form.Label>
    <Form.Control placeholder="Subject"
    
    {...register("FormSubject", { required: 'Este campo é obrigatório' })}
    id="FormSubject"  
    type="text" 
  />
  {errors.FormSubject && <p>{errors.FormSubject.message}</p>}
</Form.Group>



<Form.Group className="mt-3">
    <Form.Label>Message</Form.Label>
    <Form.Control as="textarea" rows={8} placeholder="Your message"
      {...register("FormMessage", { required: 'Este campo é obrigatório' })}
      id="FormMessage" 
    />
    {errors.FormMessage && <p>{errors.FormMessage.message}</p>}
</Form.Group>



<Button type="submit"  className="mt-3 mb-3 bg-red border-transparent border-0 ">
    Submit
</Button>

</Form>      

</Col>   
</Container>
</div>
)
}

export default Formu;