import React from 'react';
import PropTypes from 'prop-types';

class ProductDetail extends React.Component {
  render() {
    const {
      thumbnail,
      title,
      price,
      atributes,
    } = this.props;

    return (
      <div className="ProductDetail">
        <p>{ title }</p>
        <img src={ thumbnail } alt={ title } />
        <span>{`Valor: ${price}`}</span>
        {
          atributes.map((element) => (
            <div key={ element.id }>
              <p>{ element.name }</p>
              <p>{ element.value_name }</p>
            </div>
          ))

        }
      </div>
    );
  }
}

ProductDetail.propTypes = {
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  atributes: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default ProductDetail;

// itemlist.atributes.map(element) nome = element.name valor= element.value_name
