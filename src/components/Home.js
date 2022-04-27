import React from 'react';
import ItemCard from './ItemCard';
import NotFound from './NotFound';
import { getProductsFromCategoryAndQuery } from '../services/api';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      saveInput: 'Pesquise um produto',
      itemList: [],
      searchFail: false,
    };
  }

  searchInApi = async () => {
    const { searchInput } = this.state;
    const returnApi = await getProductsFromCategoryAndQuery(null, searchInput);
    const { results } = returnApi;
    if (!results) {
      this.setState({ searchFail: true });
    } else {
      this.setState({
        itemList: results,
        searchFail: false,
      });
    }
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
      itemList,
      searchFail,
    } = this.state;

    return (
      <div>

        <input
          type="text"
          data-testid="query-input"
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

        <div>
          { searchFail ? <NotFound />
            : itemList.map((element) => (
              <div key={ element.id }>
                <ItemCard
                  thumbnail={ element.thumbnail }
                  title={ element.title }
                  price={ element.price }
                />
              </div>
            ))}
        </div>

      </div>
    );
  }
}

export default Home;
