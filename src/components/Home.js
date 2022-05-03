import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import ItemCard from './ItemCard';
import NotFound from './NotFound';
import { getProductsFromCategoryAndQuery, getCategories } from '../services/api';
import './Components.css';

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
      SelectedCategories: '',
    };
    this.GetFetchCategories = this.GetFetchCategories.bind(this);
    this.OnClickCategories = this.OnClickCategories.bind(this);
  }

  componentDidMount() {
    this.GetFetchCategories();
  }

  CartButtonClick = () => {
    this.setState({
      redirectTo: '/carrinho',
    });
  }

  searchInApi = async (Categorie, searchInput) => {
    console.log(Categorie, searchInput);
    const returnApi = await getProductsFromCategoryAndQuery(Categorie, searchInput);
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
    const { searchInput, SelectedCategories } = this.state;
    if (SelectedCategories === '') {
      this.searchInApi(null, searchInput);
    } else if (SelectedCategories !== '') {
      // Coloquei esse codigo para o prox requisito quando a pessoa pesquisarr
      // Categoria e Input ao mesmo tempo
      this.searchInApi(SelectedCategories, searchInput);
    }

    this.setState({
      saveInput: searchInput,
      searchInput: '',
    });
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
      // Nessa parte estou fazendo que ao clique em uma categoria
      // Seja chamada a função OnClickCategories com o valor do Id dacategoria
      <div
        aria-hidden="true"
        key={ value.id }
        onKeyDown={ () => this.OnClickCategories(value.id) }
        onClick={ () => this.OnClickCategories(value.id) }
      >
        <p data-testid="category">{value.name}</p>
      </div>
    ));
    return list;
  }

  async GetFetchCategories() {
    const fetchCategories = await getCategories();
    this.setState({ Categories: fetchCategories });
  }

  OnClickCategories(CategorieId) {
    this.setState({ SelectedCategories: CategorieId });
    // Aqui estou puxando a função searchInApi com o id da categoria

    this.searchInApi(CategorieId, null);
  }

  render() {
    const {
      searchInput,
      saveInput,
      itemList,
      searchFail,
      redirectTo,
    } = this.state;

    const { AddItemOnCart } = this.props;

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
        <section className="CategoriesAndItens">
          <section className="Categories">
            {this.ListOfCategories()}
          </section>
          <div className="Items">
            { searchFail ? <NotFound />
              : itemList.map((element) => (
                <div data-testid="product" key={ element.id }>
                  <ItemCard
                    { ...this.props }
                    AddItemOnCart={ AddItemOnCart }
                    thumbnail={ element.thumbnail }
                    title={ element.title }
                    price={ element.price }
                  />
                </div>
              ))}
          </div>
        </section>
      </main>
    );
  }
}

Home.propTypes = {
  AddItemOnCart: PropTypes.func.isRequired,
};
//
export default Home;
