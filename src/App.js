import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Carrinho from './Carrinho';
import ItemCard from './components/ItemCard';
// import { getCategories } from './services/api';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      itemsOnCart: [],
    };
    this.AddItemOnCart = this.AddItemOnCart.bind(this);
  }

  AddItemOnCart(itemObj) {
    const { itemsOnCart } = this.state;
    console.log(itemObj);
    this.setState({ itemsOnCart: [...itemsOnCart, itemObj] });
  }

  render() {
    console.log(this.state.itemsOnCart);
    const { itemsOnCart } = this.state;
    return (
      <BrowserRouter>
        <main>
          <Switch>
            <Route
              exact
              path="/"
              render={ (props) => (<Home
                { ...props }
                AddItemOnCart={ this.AddItemOnCart }
              />) }
            />
            <Route
              path="/Carrinho"
              render={ (props) => <Carrinho { ...props } CartItems={ itemsOnCart } /> }
            />
          </Switch>
        </main>
      </BrowserRouter>
    );
  }
}

export default App;
