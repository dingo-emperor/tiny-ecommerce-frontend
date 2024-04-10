import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, Select, Button, Pagination, InputNumber } from 'antd';
import ProductCard from './ProductCard';
import axios from 'axios';

const { Option } = Select;

const Products = () => {
  const pageSize = 10; // 每页显示的商品数量
  const [products, setProducts] = useState([]); // 假设这里是从API获取的商品列表
  const [form] = Form.useForm();
  const [name, setName] = useState(undefined)
  const [category, setCategory] = useState(undefined)
  const [priceRangeStart, setPriceRangeStart] = useState(undefined)
  const [priceRangeEnd, setPriceRangeEnd] = useState(undefined)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(30)

  useEffect(() => {
    // 模拟从API获取数据
    fetchFilteredProducts(name, category, priceRangeStart, priceRangeEnd, page);
  }, [name, category, priceRangeStart, priceRangeEnd, page]);


  const fetchFilteredProducts = async (name, category, priceRangeStart, priceRangeEnd, page) => {
    // TODO
    // 假设getProduct是一个异步函数，从后端API获取商品数据
    // setProducts(获取到的商品数据);
    try {
      const response = await axios.get('http://localhost:8080/api/products')
      const data = await response.data.content
      console.log("response data:", data)
      setProducts(res.products)
      setTotal(res.total)
    } catch (error) {
      console.error('There was an error on axios: ', error);
    }

    // const res = await getProductAndTotal(name, category, priceRangeStart, priceRangeEnd, page)
    // setProducts(res.products)
    // setTotal(res.total)
  };

  const getProductAndTotal = async (name, category, priceRangeStart, priceRangeEnd, page) => {
    const products = [{
        name: "name",
        category: "category",
        brand: "brand",
        price: 114514
      }]
    let total = 50    
    return {
        products,
        total
    }
  }

  const setFilters = (values) => {
    console.log(values)
    setName(values.name)
    setCategory(values.category)
    setPriceRangeStart(values.priceRangeStart)
    setPriceRangeEnd(values.priceRangeEnd)
  }

  const changePage = (page, pageSize) => {
    console.log(page)
    setPage(page)
  }

  return (
    <div>
      <Form form={form} onFinish={setFilters} layout="inline">
        {/* <Form.Item name="sortPrice" label="价格排序">
            <Select placeholder="选择排序方式">
                <Option value="ascend">升序</Option>
                <Option value="descend">降序</Option>
            </Select>
        </Form.Item> */}
        <Form.Item name="name">
          <Input placeholder="商品名称" />
        </Form.Item>
        <Form.Item name="category">
          <Select placeholder="选择分类">
            <Option value="category1">分类1</Option>
            <Option value="category2">分类2</Option>
            {/* 根据实际分类添加Option */}
          </Select>
        </Form.Item>
        <Form.Item label="价格区间" style={{ marginBottom: 0 }}>
            <Form.Item
                name="priceRangeStart"
                rules={[{ type: 'number', min: 0, message: '最低价格必须大于等于0' }]}
                style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
            >
                <InputNumber placeholder="最低价格" min={0} />
            </Form.Item>
            <span
                style={{ display: 'inline-block', width: '16px', textAlign: 'center' }}
            >
                -
            </span>
            <Form.Item
                name="priceRangeEnd"
                rules={[{ type: 'number', min: 0, message: '最高价格必须大于等于0' }]}
                style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
            >
                <InputNumber placeholder="最高价格" min={0} />
            </Form.Item>
            </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">搜索</Button>
        </Form.Item>
      </Form>
      <Row gutter={16}>
        {products.map(product => (
          <Col span={8} key={product.name}>
            <ProductCard {...product} />
          </Col>
        ))}
      </Row>
      <Pagination onChange={changePage} total={total} /> {/* 根据实际情况调整 */}
    </div>
  );
};

export default Products;
