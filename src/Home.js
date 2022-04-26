import React from 'react';

class Home extends React.Component {
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
      </div>
    );
  }
}

export default Home;
