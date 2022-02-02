import React,{useState} from 'react';
import * as Joi from "joi";
import { Form, Button } from 'react-bootstrap';
const UpdateEvento=(props)=>{
    const [nombre, setnombre] = useState(props.event.nombre);
    const [categoria, setcategoria] = useState(props.event.categoria);
    const [lugar, setlugar] = useState(props.event.lugar);
    const [direccion, setdireccion] = useState(props.event.direccion);
    const [inicio, setinicio] = useState(Date.parse(props.event.inicio));
    const [fin, setfin] = useState(Date.parse(props.event.fin));
    const [presencial, setpresencial] = useState(props.event.presencial);

    const updateEvent=(e)=>{
        e.preventDefault();
        let form={nombre:nombre,categoria:categoria,lugar:lugar,direccion:direccion,inicio:inicio,fin:fin,presencial:presencial,creador:props.event.creador,id:props.event.id};
        const {error}=schema.validate(form);
        if(error){
            alert(error.message);
        }
        else{
            fetch("http://127.0.0.1:5000/eventos/"+props.event.id,{method:'PUT',headers: {'Accept': 'application/json','Content-Type': 'application/json'},body:JSON.stringify(form)}).then(ans=>ans.json()).then(data=>{
                props.setEvent(data)
                alert("Event "+data.nombre+" updated")
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
        <Form onSubmit={updateEvent}>
            <Form.Group className="mb-3" controlId="createNombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="input" placeholder={nombre} onChange={(e)=>changeNombre(e)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="createCategoria">
                <Form.Label>Categoria</Form.Label>
                <Form.Select onChange={(e)=>changeCategoria(e)} placeholder={categoria}>
                    <option>Seminario</option>
                    <option>Conferencia</option>
                    <option>Congreso</option>
                    <option>Curso</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="createLugar">
                <Form.Label>Lugar</Form.Label>
                <Form.Control type="input" placeholder={lugar} onChange={(e)=>changeLugar(e)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="createDireccion">
                <Form.Label>Direccion</Form.Label>
                <Form.Control type="input" placeholder={direccion} onChange={(e)=>changeDireccion(e)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="createInicio">
                <Form.Label>Inicio</Form.Label>
                <Form.Control type="date" placeholder={inicio} onChange={(e)=>changeInicio(e)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="createFin">
                <Form.Label>Fin</Form.Label>
                <Form.Control type="date" placeholder={`${fin.month}/${fin.day}/${fin.year}`}  onChange={(e)=>changeFin(e)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="createPresencial">
                <Form.Check type="checkbox" label="Presencial" checked={presencial} onChange={(e)=>changePresencial(e)}/>
             </Form.Group>
            <Button variant="primary" type="submit" >
                Update
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
    creador:Joi.number().integer().required(),
    id:Joi.number().integer().required(),

})

export default UpdateEvento;