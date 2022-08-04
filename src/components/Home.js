import React from 'react';
import PropTypes from 'prop-types';
import ItemCard from './ItemCard';
import NotFound from './NotFound';
import { getProductsFromCategoryAndQuery, getCategories } from '../services/api';
import './Components.css';
import Cart from './Cart';
import '../HomeCSS/Home.css';
import '../fontawesome/css/all.css';
import logo from '../HomeCSS/Logo-Online-Store.svg';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      saveInput: 'Pesquise um produto',
      itemList: [],
      searchFail: false,
      Categories: [],
      SelectedCategories: '',
    };
    this.GetFetchCategories = this.GetFetchCategories.bind(this);
    this.OnClickCategories = this.OnClickCategories.bind(this);
  }

  componentDidMount() {
    this.GetFetchCategories();
  }

  searchInApi = async (Categorie, searchInput) => {
    const returnApi = await getProductsFromCategoryAndQuery(Categorie, searchInput);
    const { results } = returnApi;
    console.log(results);
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
      // Coloquei esse codigo para o prox requisito quando a pessoa pesquisar
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
        className="list-categories"
        aria-hidden="true"
        key={ value.id }
        onKeyDown={ () => this.OnClickCategories(value.id) }
        onClick={ () => this.OnClickCategories(value.id) }
      >
        <p
          className="category"
          data-testid="category"
        >
          {value.name}

        </p>
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
    } = this.state;

    const { AddItemOnCart } = this.props;

    return (
      <main>
        <header className="header-container">
          <div className="logo">
            <img src={ logo } alt="logo" />
          </div>
          <div className="search">
            <input
              className="form-control"
              type="text"
              data-testid="query-input"
              placeholder={ saveInput }
              value={ searchInput }
              onChange={ this.onChange }
            />
            <button
              type="button"
              className="button-search"
              data-testid="query-button"
              onClick={ this.btnClick }
            >
              <i
                className="fa-solid fa-magnifying-glass"
              />
            </button>

            <Cart />
          </div>

        </header>
        <div className="MsgInicial">
          <p
            data-testid="home-initial-message"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        </div>
        <section className="CategoriesAndItens">
          <section className="Categories">
            {this.ListOfCategories()}
          </section>
          <div className="products">
            { searchFail ? <NotFound />
              : itemList.map((element) => (
                <div
                  aria-hidden="true"
                  data-testid="product"
                  key={ element.id }
                >
                  <ItemCard
                    { ...this.props }
                    AddItemOnCart={ AddItemOnCart }
                    thumbnail={ element.thumbnail }
                    title={ element.title }
                    price={ element.price }
                    element={ element.id }
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
