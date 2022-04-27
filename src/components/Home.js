import React from 'react';
import { Redirect } from 'react-router-dom';
import ItemCard from './ItemCard';
import NotFound from './NotFound';
import { getProductsFromCategoryAndQuery, getCategories } from '../services/api';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      saveInput: 'Pesquise um produto',
      itemList: [],
      searchFail: false,
      redirectTo: '',
      Categories: [],
    };
    this.GetFetchCategories = this.GetFetchCategories.bind(this);
  }

  componentDidMount() {
    this.GetFetchCategories();
  }

  CartButtonClick = () => {
    this.setState({
      redirectTo: '/carrinho',
    });
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

  ListOfCategories() {
    const { Categories } = this.state;
    const list = Categories.map((value) => (
      <div key={ value.id }>
        <p data-testid="category">{value.name}</p>
      </div>
    ));
    return list;
  }

  async GetFetchCategories() {
    const fetchCategories = await getCategories();
    this.setState({ Categories: fetchCategories });
  }

  render() {
    const {
      searchInput,
      saveInput,
      itemList,
      searchFail,
      redirectTo,
    } = this.state;

    return (
      <main>
        <Redirect to={ redirectTo } />
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
        <section>
          {this.ListOfCategories()}
        </section>
      </main>
    );
  }
}
// teste
export default Home;
