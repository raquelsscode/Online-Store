import React, { Component } from 'react';

export default class Carrinho extends Component {
  constructor() {
    super();
    this.state = {
      emptypage: true,
    };
  }

  render() {
    const { emptypage } = this.state;
    // const { CartItems } = this.props;
    return (
      <div>
        {emptypage
          ? (<p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>)
          : ''}
      </div>
    );
  }
}
