import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Carrinho extends Component {
  constructor() {
    super();
    this.state = {
      emptypage: true,
      Items: [],
      count: 1,
      buttonDisabled: true,
    };
    this.CheckCart = this.CheckCart.bind(this);
  }

  componentDidMount() {
    this.AddQuantity();
    const { CartItems } = this.props;
    this.setState({ Items: CartItems });
    this.CheckCart();
  }

  IncreaseQuantity = () => {
    this.setState((prevState) => {
      this.setState({
        count: prevState.count + 1,
        buttonDisabled: false,
      });
    });
  }

  DecreaseQuantity = () => {
    const { count } = this.state;
    if (count === 2) {
      this.setState({
        buttonDisabled: true,
      });
    }
    this.setState((prevState) => {
      this.setState({
        count: prevState.count - 1,
      });
    });
  }

  CheckCart() {
    const { CartItems } = this.props;
    if (CartItems.length !== 0) {
      this.setState({ emptypage: false });
    }
  }

  AddQuantity() {
    const { Items } = this.state;
    const newItems = Items.map((value) => ({ ...value, quantity: 1 }));
    this.setState({ Items: newItems });
  }

  ItemCard() {
    const { CartItems } = this.props;
    const { count, buttonDisabled } = this.state;
    const list = CartItems.map((value) => (
      <div key={ value.title }>
        <p data-testid="shopping-cart-product-name">{ value.title }</p>
        <img src={ value.thumbnail } alt={ value.title } />
        <span>{`Valor: ${value.price}`}</span>
        <p
          data-testid="shopping-cart-product-quantity "
        >
          {value.title}
          {' '}
          {count}
        </p>
        <button
          type="button"
          data-testid="product-increase-quantity"
          onClick={ this.IncreaseQuantity }
        >
          +
        </button>
        <button
          type="button"
          data-testid="product-decrease-quantity"
          onClick={ this.DecreaseQuantity }
          disabled={ buttonDisabled }
        >
          -
        </button>
      </div>
    ));
    return list;
  }

  render() {
    const { emptypage } = this.state;
    // const { CartItems } = this.props;
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
//
