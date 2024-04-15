import React, { useState, useEffect } from 'react';
import { Space, Table, Modal, Input, InputNumber, Button } from 'antd';
import axios from 'axios';

const Cart = () => {
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 50,
    });

    useEffect(() => {
        console.log('pagination', pagination)
        // 模拟从API获取数据
        fetchAllProducts(pagination);
    }, [pagination.current, pagination.pageSize, pagination.total]);

    const handleDelete = () => {
        // TODO Delete product from cart
    }

    const clearCart = () => {
        // TODO: Clear cart in database
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
                    brand: 'b1',
                    price: 32,
                    category: 'c1',
                },
                {
                    key: '2',
                    name: 'Jim Green',
                    brand: 'b2',
                    price: 42,
                    category: 'c2',
                },
                {
                    key: '3',
                    name: 'Joe Black',
                    brand: 'b3',
                    price: 32,
                    category: 'c3',
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
        title: 'Brand',
        dataIndex: 'brand',
        key: 'brand',
    },
    {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record, idx) => (
            <Space size="middle">
                <InputNumber placeholder="number" min={0} />
                <a onClick={handleDelete}>Delete</a>
            </Space>
        ),
    },
    ];
    
    return (
        <div>
            <Button type="primary" onClick={clearCart}>Clear Cart</Button>
            <Table columns={columns} dataSource={products} pagination={pagination} onChange={handleTableChange} />
        </div>
    )
}

export default Cart;