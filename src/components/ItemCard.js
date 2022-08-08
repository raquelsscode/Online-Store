import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class ItemCard extends React.Component {
  constructor() {
    super();
    this.AddToCard = this.AddToCard.bind(this);
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
    const {
      thumbnail,
      title,
      price, element, } = this.props;

    return (
      <div
        className="ItemCard"
      >

        <p>{ title }</p>
        <img src={ thumbnail } alt={ title } />
        <span>{`Valor: ${price}`}</span>
        <div className="container-button">
          <button
            className="add-cart-button"
            type="button"
            data-testid="product-add-to-cart"
            onClick={ () => this.AddToCard(title, thumbnail, price) }
          >
            Adicionar ao carrinho

          </button>
          <Link
            data-testid="product-detail-link"
            to={ `/product/${element}` }
            key={ element }
            // banana={ AddItemOnCart }
          >
            <button type="button" className="details">
              {' '}
              <i className="fa-solid fa-square-plus" />
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

ItemCard.propTypes = {
  element: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  AddItemOnCart: PropTypes.func.isRequired,
};
//
export default ItemCard;
