import React from 'react';
// import ItemCard from './components/ItemCard';
import { getProductsFromCategoryAndQuery } from './services/api';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      saveInput: 'Pesquise um produto',
      // itemList: [],
    };
  }

  searchInApi = async () => {
    const { searchInput } = this.state;
    console.log(searchInput);

    const returnApi = await getProductsFromCategoryAndQuery(null, searchInput);
    const { results } = returnApi;
    // this.setState({ itemList: results });
    console.log(results);
  };

  btnClick = (event) => {
    event.preventDefault();
    const { searchInput } = this.state;
    this.setState({
      saveInput: searchInput,
      searchInput: '',
    });
    this.searchInApi();
  }

  onChange = ({ target }) => {
    const { value } = target;
    this.setState({
      searchInput: value,
    });
  }

  render() {
    const {
      searchInput,
      saveInput,
      // itemList,
    } = this.state;

    return (
      <div>

        <input
          type="text"
          placeholder={ saveInput }
          value={ searchInput }
          onChange={ this.onChange }
        />

        <button
          type="button"
          data-testid="query-button"
          onClick={ this.btnClick }
        >
          Pesquisar
        </button>

        <p
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        {/*
        <div>
          {
            itemList.map((element) => (
              <ItemCard
                key={ element.id }
                thumbnail={ element.thumbnail }
                title={ element.thumbnail }
                price={ element.thumbnail }
              />
            ))
          }
        </div> */}

      </div>
    );
  }
}

export default Home;

// imagem = thumbnail
// nome = title
// preço = price
