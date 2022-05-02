import React from 'react';
import PropTypes from 'prop-types';

class ItemCard extends React.Component {
  render() {
    const {
      thumbnail,
      title,
      price } = this.props;

    return (
      <div>
        <p>{ title }</p>
        <img src={ thumbnail } alt={ title } />
        <span>{`Valor: ${price}`}</span>
        <button
          type="button"
          data-testid="product-add-to-cart"
          onClick={ this.AddCartButton }
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}

ItemCard.propTypes = {
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default ItemCard;
