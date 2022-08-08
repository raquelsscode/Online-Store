import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './fontawesome/css/all.css';
import './Carrinho.css';

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
    this.IncreaseQuantity = this.IncreaseQuantity.bind(this);
    this.RemoveItem = this.RemoveItem.bind(this);
  }

  componentDidMount() {
    this.AddQuantity();
    const { CartItems } = this.props;
    this.setState({ Items: CartItems });
    this.CheckCart();
  }

  RemoveItem = (index) => {
   const { Items } = this.state;
   console.log(index);
   const filterRemove = Items.filter((item) => index !== item.title);
   console.log([filterRemove]);
   this.setState({ Items: filterRemove });
  }

  IncreaseQuantity = (index) => {
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
    const { Items } = this.state
  //  console.log(Items);
    // const { CartItems } = this.props;
    const { count, buttonDisabled } = this.state;
    const list = Items.map((value, index) => (
      <div className='container' key={index} >
      <div className='items-container'>
        <img src={ value.thumbnail } alt={ value.title } />
        <p className='title' data-testid="shopping-cart-product-name">{ value.title }</p>
        <span>{`Valor: ${value.price}`}</span>
        <button
          type="button"
          data-testid="product-increase-quantity"
          onClick={ () => this.IncreaseQuantity(index) }
        >
         <i className="fa-solid fa-circle-plus"/>
        </button>
        <p
          data-testid="shopping-cart-product-quantity "
        >
          {' '}
          {count}
        </p>
        <button
          type="button"
          data-testid="product-decrease-quantity"
          onClick={ this.DecreaseQuantity }
          disabled={ buttonDisabled }
        >
          <i className="fa-solid fa-circle-minus"/>
        </button>
        <button 
        type="button"
        onClick={ () => this.RemoveItem(value.title) }
        >
          Excluir
        </button>
      </div>
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
          ? ( <div className='cart-empty'>
            <p data-testid="shopping-cart-empty-message">
            <i 
            className="fa-solid fa-cart-shopping icon"
            />
            Seu Carrinho esta vazio
            </p>
            </div>
            )
          : this.ItemCard()}
      </div>
    );
  }
}

Carrinho.propTypes = {
  CartItems: PropTypes.arrayOf(PropTypes.object).isRequired,
};
//
