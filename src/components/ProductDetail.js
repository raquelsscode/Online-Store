import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';
import Cart from './Cart';

class ProductDetail extends Component {
  constructor() {
    super();

    this.state = {
      product: [],
    };
    this.AddToCard = this.AddToCard.bind(this);
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const api = await getProductById(id);
    this.setState({ product: api });
  }

  AddToCard(title, thumbnail, price) {
    const { AddItemOnCart } = this.props;
    const newItem = {
      title,
      thumbnail,
      price,
    };
    AddItemOnCart(newItem);
  }

  render() {
    const { product } = this.state;

    return product.length !== 0 && (
      <div className="ItemDetails">
        <div>
          <p data-testid="product-detail-name">{product.title}</p>
          <img src={ product.thumbnail } alt={ product.title } />
          <span>{`Valor: ${product.price}`}</span>
          <button
            type="button"
            data-testid="product-detail-add-to-cart"
            onClick={ () => this.AddToCard(
              product.title, product.thumbnail, product.price,
            ) }
          >
            Adicionar ao carrinho
          </button>
          <Cart />
        </div>
      </div>
    );
  }
}

ProductDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  AddItemOnCart: PropTypes.func.isRequired,
};

export default ProductDetail;
