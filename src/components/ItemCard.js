import React from 'react';
import PropTypes from 'prop-types';

class ItemCard extends React.Component {
  render() {
    const {
      thumbnail,
      title,
      price } = this.props;

    return (
      <div data-testid="product">
        <p>{ title }</p>
        <image src={ thumbnail } alt={ title } />
        <span>{ price }</span>
      </div>
    );
  }
}

ItemCard.propTypes = {
  thumbnail: PropTypes.string(PropTypes.any).isRequired,
  title: PropTypes.string(PropTypes.any).isRequired,
  price: PropTypes.number(PropTypes.any).isRequired,
};

export default ItemCard;
