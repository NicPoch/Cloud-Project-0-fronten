import React from 'react';
import Header from './components/header/header';
import Main from './components/main/main';
import './styles/app.css';

const App=()=> {
  return (  
    <div className="App">
      <Header/>
      <Main/>
    </div>
  );
}

export default App;
