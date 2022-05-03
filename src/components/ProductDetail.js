import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';

class ProductDetail extends Component {
  constructor() {
    super();

    this.state = {
      product: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const api = await getProductById(id);
    this.setState({ product: api });
  }

  render() {
    const { product } = this.state;

    return product.length !== 0 && (
      <div className="ItemDetails">
        <div>
          <p data-testid="product-detail-name">{product.title}</p>
          <img src={ product.thumbnail } alt={ product.title } />
          <span>{`Valor: ${product.price}`}</span>
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
};

export default ProductDetail;
