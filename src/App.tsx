import React from "react";
import './App.css';
import { BrowserRouter } from "react-router-dom";
import Router from './components/router/Router';

const App: React.FC = () => {

  return(
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
}

export default App;