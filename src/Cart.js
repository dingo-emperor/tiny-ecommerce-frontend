import React, { useState, useEffect } from 'react';
import { Space, Table, Typography, InputNumber, Button } from 'antd';
import axios from 'axios';

const { Title } = Typography;

const Cart = () => {
    const userName = 'Alice';
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 50,
    });
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        console.log('pagination', pagination)
        // 模拟从API获取数据
        fetchAllProducts(pagination);
    }, [pagination.current, pagination.pageSize, pagination.total, refresh]);

    const handleDelete = (userName, productName) => async () => {
        // TODO Delete product from cart
        setRefresh(!refresh);
    }

    const clearCart = (userName) => async () => {
        // TODO: Clear cart in database
        setRefresh(!refresh);
    }

    const handleNumberChange = (userName, productName) => async (value) => {
        // TODO Update product number in cart
    }
      

    const fetchAllProducts = async (pagination) => {
        try {
            const response = await axios.get('http://localhost:8080/api/products/search', {
                params: {
                    page: pagination.current - 1,  // API 通常以 0 为基数计数页面
                    size: pagination.pageSize,
                }
            })
            const data = await response.data.content
            const total = await response.data.totalElements
            products = data.map((product, idx) => {
                return {
                    key: String(idx),
                    name: product.name,
                    brand: product.brand,
                    category: product.category,
                    price: product.price,
                }
            })
            setProducts(products)
            setPagination({ ...pagination, total: total })
        } catch (error) {    
            console.error('There was an error on axios: ', error);
            const products = [
                {
                    key: '1',
                    name: 'John Brown',
                    quantity: 32,
                },
                {
                    key: '2',
                    name: 'John Brown',
                    quantity: 42,
                },
                {
                    key: '3',
                    name: 'John Brown',
                    quantity: 32,
                },
            ];
            setProducts(products)
            setPagination({ ...pagination, total: 50 })
        }
    }

    const handleTableChange = (newPagination) => {
        fetchAllProducts(newPagination);
    };

    const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
    },
    {
        title: 'Brand',
        dataIndex: 'brand',
        key: 'brand',
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: 'Quantity',
        key: 'quantity',
        render: (_, record, idx) => (
            <Space size="middle">
                <InputNumber placeholder="number" min={1} defaultValue={record.quantity} onChange={handleNumberChange(userName, record.name)} />
            </Space>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record, idx) => (
            <Space size="middle">
                <a onClick={handleDelete(userName, record.name)}>Delete</a>
            </Space>
        ),
    },
    ];
    
    return (
        <div>
            <Title>Welcome, {userName}</Title>
            <Button type="primary" onClick={clearCart(userName)}>Clear Cart</Button>
            <Table columns={columns} dataSource={products} pagination={pagination} onChange={handleTableChange} />
        </div>
    )
}

export default Cart;