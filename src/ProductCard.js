import React from 'react';
import { Card } from 'antd';
import axios from 'axios';

const { Meta } = Card;

const userName = 'Alice';

const ProductCard = ({ name, category, price, brand }) => {
  const handleAddToCart = (userName, name) => async () => {
    // TODO Add product to cart
    axios.post('http://localhost:8080/api/carts', {
      username: userName,
      productname: name,
      quantity: 1
    })
    console.log('Added product to cart');
  }
  return (
    <Card
      hoverable
      title={name}
      extra={<a onClick={handleAddToCart(userName, name)}>Add to Cart</a>}
      style={{ width: 240 }}
    >
      <p>Category: {category}</p>
      <p>Brand: {brand}</p>
      <p>Price: {price}</p>
    </Card>
  );
}

export default ProductCard;
