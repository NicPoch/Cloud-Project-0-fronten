import React,{useEffect} from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import ListEventos from './eventos/listEventos';
import Login from './login/login';
import Registration from './registration/registration';
import UpdateUser from './user/user';

const Main=(props)=>{
    let user =props.user;

    useEffect(() => {
        if(!navigator.onLine){
            if(localStorage.getItem("user")!==null){
                props.setUser(localStorage.getItem("user"));
            }
        }
    }, []);
    

    const notLogged=()=>{
        return(
            <Row>
                <Col>
                    <h2>Login</h2>
                    <Login setUser={props.setUser}/>
                </Col>
                <Col>
                    <h2>Sign Up</h2>
                    <Registration setUser={props.setUser}/>
                </Col>
            </Row>
        );
    };
    const logged=()=>{
        return(
            <Container fluid>
                <Row>
                    <h2>
                        Hello user {user.mail}
                    </h2>
                </Row>
                <Row>
                    <UpdateUser user={user}/>
                </Row>
                <Row>
                    <ListEventos user_id={user.id}/>
                </Row>
            </Container>
        );
    };

    return((user)? logged():notLogged());
}

export default Main;