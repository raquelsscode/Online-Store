import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Carrinho from './Carrinho';
import ProductDetail from './components/ProductDetail';
// import { getCategories } from './services/api';

function App() {
  return (
    <BrowserRouter>
      <main>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route path="/carrinho" component={ Carrinho } />
          <Route path="/product/:id" component={ ProductDetail } />
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
