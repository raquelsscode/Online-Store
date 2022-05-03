import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Cart extends Component {
  render() {
    return (
      <Link to="/Carrinho">
        <div>

          <button
            data-testid="shopping-cart-button"
            type="button"
          >
            Carrinho
          </button>
        </div>
      </Link>
    );
  }
}
