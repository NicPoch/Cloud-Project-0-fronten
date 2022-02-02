import React, { useState } from 'react';
import { Accordion, Button,Col,Row } from 'react-bootstrap';
import UpdateEvento from './updateEvento';


const Evento=(props)=>{
    const [event, setevent] = useState(props.event);
    const deleteThis=async ()=>{
        fetch("http://127.0.0.1:5000/eventos/"+props.event.id,{method:'DELETE',headers: {'Accept': 'application/json','Content-Type': 'application/json'}}).then(ans=>ans.json()).then(data=>{
                console.log(data);
                alert("Event "+data.nombre+" deleted")
                props.delete(data.id)
        });
    };
    return(<Accordion.Item eventKey={""+props.event.id}>
                <Accordion.Header>{props.event.nombre}</Accordion.Header>
                <Accordion.Body>
                    <Row>
                        <Col>
                            <h2>Event Detail</h2>
                            <ul>
                                <li>
                                    Categoria: {event.categoria}
                                </li>
                                <li>
                                    Lugar: {event.lugar}
                                </li>
                                <li>
                                    direccion: {event.direccion}
                                </li>
                                <li>
                                    Inicio: {event.inicio}
                                </li>
                                <li>
                                    fin: {event.fin}
                                </li>
                                <li>
                                    Presencial: {(event.presencial)? "Yes":"No"}
                                </li>
                            </ul>
                            <Button variant='danger' onClick={deleteThis}>
                                Delete
                            </Button>
                        </Col>
                        <Col>
                            <h2>Update Event</h2>
                            <UpdateEvento event={event} setEvent={(e)=>setevent(e)}/>
                        </Col>
                    </Row>
                </Accordion.Body>
            </Accordion.Item>)
}

export default Evento;
