import React, { useState, useEffect } from 'react';
import { Space, Table, Tag } from 'antd';
import axios from 'axios';

const Manager = () => {
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 50,
    });

    useEffect(() => {
        console.log(pagination)
        // 模拟从API获取数据
        fetchAllProducts(pagination);
    }, [pagination.current, pagination.pageSize, pagination.total]);

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
                    age: 32,
                    address: 'New York No. 1 Lake Park',
                },
                {
                    key: '2',
                    name: 'Jim Green',
                    age: 42,
                    address: 'London No. 1 Lake Park',
                },
                {
                    key: '3',
                    name: 'Joe Black',
                    age: 32,
                    address: 'Sydney No. 1 Lake Park',
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
        render: (text) => <a>{text}</a>,
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
        render: (_, record, idx) => (
            <a>Edit</a>
        ),
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        render: (_, record, idx) => (
            <a>Edit</a>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record, idx) => (
            <Space size="middle">
                <a>Delete</a>
            </Space>
        ),
    },
    ];
    
    return (
        <div>
            <Table columns={columns} dataSource={products} pagination={pagination} onChange={handleTableChange} />
        </div>
    )
}

export default Manager;