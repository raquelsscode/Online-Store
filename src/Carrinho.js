import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Carrinho extends Component {
  constructor() {
    super();
    this.state = {
      emptypage: true,
      Items: [],
    };
    this.CheckCart = this.CheckCart.bind(this);
    this.HandlerChange = this.HandlerChange.bind(this);
  }

  componentDidMount() {
    this.AddQuantity();
    const { CartItems } = this.props;
    this.setState({ Items: CartItems });
    this.CheckCart();
  }

  CheckCart() {
    const { CartItems } = this.props;
    if (CartItems.length !== 0) {
      this.setState({ emptypage: false });
    }
  }

  HandlerChange(event, index) {
    const { Items } = this.state;
    Items[index].quantity = event.target.value;
  }

  AddQuantity() {
    const { Items } = this.state;
    const newItems = Items.map((value) => ({ ...value, quantity: 1 }));
    this.setState({ Items: newItems });
  }

  ItemCard() {
    const { CartItems } = this.props;
    const list = CartItems.map((value, index) => (
      <div key={ value.title }>
        <p data-testid="shopping-cart-product-name">{ value.title }</p>
        <img src={ value.thumbnail } alt={ value.title } />
        <span>{`Valor: ${value.price}`}</span>
        <p
          data-testid="shopping-cart-product-quantity "
          onChange={ (event) => this.HandlerChange(event, index) }
        >
          1
        </p>
      </div>
    ));
    return list;
  }

  render() {
    const { emptypage } = this.state;
    return (
      <div>
        {emptypage
          ? (<p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>)
          : this.ItemCard()}
      </div>
    );
  }
}

Carrinho.propTypes = {
  CartItems: PropTypes.arrayOf(PropTypes.object).isRequired,
};
