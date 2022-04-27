import React from 'react';
import { getCategories, getProductsFromCategoryAndQuery } from './services/api';

import { Redirect } from 'react-router-dom';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      redirectTo: '',
    };
  }

  CartButtonClick = () => {
    this.setState({
      redirectTo: '/carrinho',
    });
  }

  render() {
    const { redirectTo } = this.state;
    return (
      <div>
        <Redirect to={ redirectTo } />
        <input
          type="text"
          placeholder="Digite aqui o produto"
        />

        <button type="button">
          Pesquisar
        </button>


        <button
          data-testid="shopping-cart-button"
          type="button"
          onClick={ this.CartButtonClick }
        >
          Carrinho
        </button>

        <p
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>

      </div>
    );
  }
}

export default Home;
