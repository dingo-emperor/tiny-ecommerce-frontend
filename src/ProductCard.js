import React from 'react';
import { Card } from 'antd';

const { Meta } = Card;

const ProductCard = ({ name, category, price, brand }) => (
  <Card
    hoverable
    style={{ width: 240 }}
  >
    <Meta title={name} />
    <p>Category: {category}</p>
    <p>Brand: {brand}</p>
    <p>Price: {price}</p>
  </Card>
);

export default ProductCard;
