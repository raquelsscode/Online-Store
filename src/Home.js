import React from 'react';
import { getCategories, getProductsFromCategoryAndQuery } from './services/api';

class Home extends React.Component {
constructor() {
  super();

  this.state = {
    categories: [],
  };
}

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Digite aqui o produto"
        />

        <button type="button">
          Pesquisar
        </button>

        <p
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        {console.log(getCategories(), getProductsFromCategoryAndQuery())}
      </div>
    );
  }
}

export default Home;
