import React from 'react';
import { Card } from 'antd';

const { Meta } = Card;

const ProductCard = ({ name, category, price, description }) => (
  <Card
    hoverable
    style={{ width: 240 }}
    cover={<img alt="example" src="商品图片地址" />}
  >
    <Meta title={name} description={`${category}, $${price}`} />
    <p style={{ display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>
      {description}
    </p>
  </Card>
);

export default ProductCard;
