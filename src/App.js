import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Carrinho from './Carrinho';
// import { getCategories } from './services/api';

function App() {
  return (
    <BrowserRouter>
      <main>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route path="/carrinho" component={ Carrinho } />
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
