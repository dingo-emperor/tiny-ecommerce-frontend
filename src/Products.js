import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, Select, Button, Pagination, InputNumber } from 'antd';
import ProductCard from './ProductCard';
import axios from 'axios';

import './product.css';

const { Option } = Select;

const Products = () => {
  const pageSize = 18; // 每页显示的商品数量
  const [products, setProducts] = useState([]); // 假设这里是从API获取的商品列表
  const [form] = Form.useForm();
  const [name, setName] = useState(undefined)
  const [category, setCategory] = useState(undefined)
  const [brand, setBrand] = useState(undefined)
  const [sort, setSort] = useState(undefined)
  const [minPrice, setMinPrice] = useState(undefined)
  const [maxPrice, setMaxPrice] = useState(undefined)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(30)

  useEffect(() => {
    // 模拟从API获取数据
    fetchFilteredProducts(name, category, brand, sort, minPrice, maxPrice, page);
  }, [name, category, brand, sort, minPrice, maxPrice, page]);


  const fetchFilteredProducts = async (name, category, brand, sort, minPrice, maxPrice, page) => {
    console.log("params: ", name, category, brand, sort, minPrice, maxPrice, page)
    try {
      const response = await axios.get('http://localhost:8080/api/products/search', {
        params: {
          nameLike: name,
          category: category,
          brand: brand,
          sort: sort,
          minPrice: minPrice,
          maxPrice: maxPrice,
          page: page - 1,
          size: pageSize
        }
      })
      const products = await response.data.content
      const total = await response.data.totalElements
      console.log("responsed products:", products)
      console.log("responsed total:", total)
      setProducts(products)
      setTotal(total)
    } catch (error) {
      console.error('There was an error on axios: ', error);
      const products = [{
        name: "name",
        category: "category",
        brand: "brand",
        price: 114514
      }, {
        name: "name",
        category: "category",
        brand: "brand",
        price: 114514
      }, {
        name: "name",
        category: "category",
        brand: "brand",
        price: 114514
      }, {
        name: "name",
        category: "category",
        brand: "brand",
        price: 114514
      }, {
        name: "name",
        category: "category",
        brand: "brand",
        price: 114514
      }, {
        name: "name",
        category: "category",
        brand: "brand",
        price: 114514
      }, {
        name: "name",
        category: "category",
        brand: "brand",
        price: 114514
      }, {
        name: "name",
        category: "category",
        brand: "brand",
        price: 114514
      }, {
        name: "name",
        category: "category",
        brand: "brand",
        price: 114514
      }, {
        name: "name",
        category: "category",
        brand: "brand",
        price: 114514
      }, {
        name: "name",
        category: "category",
        brand: "brand",
        price: 114514
      }, {
        name: "name",
        category: "category",
        brand: "brand",
        price: 114514
      }, {
        name: "name",
        category: "category",
        brand: "brand",
        price: 114514
      }, {
        name: "name",
        category: "category",
        brand: "brand",
        price: 114514
      }, {
        name: "name",
        category: "category",
        brand: "brand",
        price: 114514
      }, {
        name: "name",
        category: "category",
        brand: "brand",
        price: 114514
      }, {
        name: "name",
        category: "category",
        brand: "brand",
        price: 114514
      }]
      setProducts(products)
      setTotal(50)
    }
  };

  const setFilters = (values) => {
    console.log("values: ", values)
    for (let key in values) {
      if (values[key] === "") {
        values[key] = undefined
      }
    }
    setName(values.name)
    setCategory(values.category)
    setBrand(values.brand)
    setSort(values.sort)
    setMinPrice(values.minPrice)
    setMaxPrice(values.maxPrice)
  }

  const changePage = (page, pageSize) => {
    console.log(page)
    setPage(page)
  }

  return (
    <div>
      <Form form={form} onFinish={setFilters} layout="inline" style={{ marginTop: '32px', marginBottom: '32px' }}>
        <Form.Item name="name">
          <Input placeholder="Product name" />
        </Form.Item>
        <Form.Item name="category">
          <Input placeholder="Category" />
        </Form.Item>
        <Form.Item name="brand">
          <Input placeholder="brand" />
        </Form.Item>
        <Form.Item name="sort">
          <Select placeholder="sort">
            <Option value="asc">ASC</Option>
            <Option value="desc">DES</Option>
            {/* 根据实际分类添加Option */}
          </Select>
        </Form.Item>
        <Form.Item label="Price" style={{ marginBottom: 0, display: 'flex' }}>
            <Form.Item
                name="minPrice"
                rules={[{ type: 'number', min: 0, message: 'Lowest price should >= 0' }]}
            >
                <InputNumber placeholder="Lowest" min={0} />
            </Form.Item>
            <span
                style={{ display: 'inline-block', width: '16px', textAlign: 'center', marginInlineEnd: '16px'}}
            >
                -
            </span>
            <Form.Item
                name="maxPrice"
                rules={[{ type: 'number', min: 0, message: 'Highest price should >= 0' }]}
            >
                <InputNumber placeholder="Highest" min={0} />
            </Form.Item>
            </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Search</Button>
        </Form.Item>
      </Form>
      <Row gutter={[16, 16]}>
        {products.map(product => (
          <Col span={4} key={product.name}>
            <ProductCard {...product} />
          </Col>
        ))}
      </Row>
      <Pagination onChange={changePage} total={total} pageSize={pageSize} /> {/* 根据实际情况调整 */}
    </div>
  );
};

export default Products;
