import React,{useEffect, useState} from 'react';
import { Container, Row, Accordion} from 'react-bootstrap';
import CreateEvent from './createEvent';
import Evento from './evento';

const ListEventos=(props)=>{
    const [eventos, setEventos] = useState([]);

    const deleteEvent=(id)=>{
        setEventos(eventos.filter(t=>t.id!==id))
    }
    const appendEvent=(event)=>{
        let new_events=[]
        eventos.map(e=>new_events.push(e));
        new_events.push(event);
        setEventos(new_events);
    }
    useEffect(() => {
        fetch("http://127.0.0.1:5000/eventos/user/"+props.user_id).then(ans=>ans.json()).then(data=>{
                setEventos(data)
        });
    }, []);
    

    return(
        <Container fluid>
            <Row>
                <h2>Create Evento</h2>
                <CreateEvent appendEvent={(e)=>{appendEvent(e)}} user_id={props.user_id}/>
            </Row>
            <Row>
                <p>Your events</p>
                <p>Number of events created: {eventos.length}</p>
            </Row>
            <Row>
                <Accordion defaultActiveKey="0">
                    {eventos.map(ev=>(<Evento event={ev} delete={(id)=>deleteEvent(id)} key={ev.id}/>))}
                </Accordion>
            </Row>
        </Container>
    );
}

export default ListEventos;