import React from 'react';
import { getCategories } from '../services/api';

class Home extends React.Component {
  constructor() {
    super();
    this.GetFetchCategories = this.GetFetchCategories.bind(this);
    this.state = {
      Categories: [],
    };
  }

  componentDidMount() {
    this.GetFetchCategories();
  }

  async GetFetchCategories() {
    const fetchCategories = await getCategories();
    this.setState({ Categories: fetchCategories });
  }

  ListOfCategories() {
    const { Categories } = this.state;
    const list = Categories.map((value) => (
      <div key={ value.id } onClick={() => console.log('teste')} >
        <p data-testid="category">{value.name}</p>
      </div>
    ));
    return list;
  }

  render() {
    return (
      <main>
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
        <section>
          {this.ListOfCategories()}
        </section>
      </main>
    );
  }
}

export default Home;
