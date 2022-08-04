import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../fontawesome/css/all.css';
import '../HomeCSS/Home.css';

export default class Cart extends Component {
  render() {
    return (
      <Link to="/Carrinho">
        <div>

          <button
            className='button-cart'
            data-testid="shopping-cart-button"
            type="button"
          >
            <i
            className="fa-solid fa-cart-shopping"
            />
          </button>
        </div>
      </Link>
    );
  }
}
