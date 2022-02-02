import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import * as Joi from 'joi';

const CreateEvent=(props)=>{
    const [nombre, setnombre] = useState("");
    const [categoria, setcategoria] = useState("Seminario");
    const [lugar, setlugar] = useState("");
    const [direccion, setdireccion] = useState("");
    const [inicio, setinicio] = useState(Date.now());
    const [fin, setfin] = useState(Date.now());
    const [presencial, setpresencial] = useState(false);


    const onCreate=async(event)=>{
        event.preventDefault();
        let form={nombre:nombre,categoria:categoria,lugar:lugar,direccion:direccion,inicio:inicio,fin:fin,presencial:presencial,creador:props.user_id};
        const {error}=schema.validate(form);
        if(error){
            alert(error.message);
        }
        else{
            fetch("http://127.0.0.1:5000/eventos",{method:'POST',headers: {'Accept': 'application/json','Content-Type': 'application/json'},body:JSON.stringify(form)}).then(ans=>ans.json()).then(data=>{
                props.appendEvent(data)
                alert("Event "+data.nombre+" created")
            });
        }

    }
    const changePresencial =async(e)=>{
        e.preventDefault();
        setpresencial(!presencial);
    };
    const changeFin =async(e)=>{
        e.preventDefault();
        setfin(e.target.value);
    };
    const changeInicio =async(e)=>{
        e.preventDefault();
        setinicio(e.target.value);
    };
    const changeDireccion =async(e)=>{
        e.preventDefault();
        setdireccion(e.target.value);
    };
    const changeLugar =async(e)=>{
        e.preventDefault();
        setlugar(e.target.value);
    };
    const changeCategoria =async(e)=>{
        e.preventDefault();
        setcategoria(e.target.value);
    };
    const changeNombre =async(e)=>{
        e.preventDefault();
        setnombre(e.target.value);
    };

    return(
        <Form onSubmit={onCreate} >
            <Form.Group className="mb-3" controlId="createNombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="input" placeholder="Enter Nombre"onChange={(e)=>changeNombre(e)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="createCategoria">
                <Form.Label>Categoria</Form.Label>
                <Form.Select onChange={(e)=>changeCategoria(e)}>
                    <option>Seminario</option>
                    <option>Conferencia</option>
                    <option>Congreso</option>
                    <option>Curso</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="createLugar">
                <Form.Label>Lugar</Form.Label>
                <Form.Control type="input" placeholder="Enter lugar" onChange={(e)=>changeLugar(e)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="createDireccion">
                <Form.Label>Direccion</Form.Label>
                <Form.Control type="input" placeholder="Enter direccion" onChange={(e)=>changeDireccion(e)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="createInicio">
                <Form.Label>Inicio</Form.Label>
                <Form.Control type="date" placeholder={inicio} onChange={(e)=>changeInicio(e)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="createFin">
                <Form.Label>Fin</Form.Label>
                <Form.Control type="date" placeholder={fin}  onChange={(e)=>changeFin(e)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="createPresencial">
                <Form.Check type="checkbox" label="Presencial" onChange={(e)=>changePresencial(e)}/>
             </Form.Group>
            <Button variant="primary" type="submit" >
                Create
            </Button>
        </Form>
    );
}
const schema=Joi.object({
    nombre: Joi.string().min(1).required(),
    categoria: Joi.string().min(1).required(),
    lugar: Joi.string().min(1).required(),
    direccion: Joi.string().min(1).required(),
    inicio: Joi.date().min(Date.now()).required(),
    fin: Joi.date().min(Joi.ref('inicio')).required(),
    presencial: Joi.boolean().required(),
    creador:Joi.number().integer().required()

})
export default CreateEvent;