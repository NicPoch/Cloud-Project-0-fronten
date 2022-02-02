import React,{useState} from 'react';
import { Container, Row } from 'react-bootstrap';
import Header from './components/header/header';
import Main from './components/main/main';
import './styles/app.css';

const App=()=> {
  const [user, setUser] = useState();
  return (  
    <Container fluid className='App'>
      <Row>
        <Header/>
      </Row>
      <Row>
        <Main setUser={setUser} user={user}/>
      </Row>
    </Container>
  );
}

export default App;
