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
        console.log('products', products)
        // 模拟从API获取数据
        fetchAllProducts(pagination);
    }, [pagination.current, pagination.pageSize, pagination.total, refresh]);

    const handleDelete = (userName, productName) => async () => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/carts/${userName}/${productName}`)
            console.log('response:', response);
        } catch (error) {
            console.error('There was an error on axios: ', error);
        }
        setRefresh(!refresh);
    }

    const clearCart = (userName) => async () => {
        try {
            const response = await axios.delete(`http://localhost:8080/api/clear/${userName}`)
            console.log('response:', response);
        } catch (error) {
            console.error('There was an error on axios: ', error);
        }
        setRefresh(!refresh);
    }

    const handleNumberChange = (userName, productName) => async (value) => {
        try {
            const response = await axios.post('http://localhost:8080/api/carts', {
                username: userName,
                productname: productName,
                quantity: value
            })
            console.log('response:', response);
            setRefresh(!refresh);
        }
        catch (error) {
            console.error('There was an error on axios: ', error);
        }

        // TODO Update product number in cart
    }
      

    const fetchAllProducts = async (pagination) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/carts/${userName}`, {
                params: {
                    page: pagination.current - 1,  // API 通常以 0 为基数计数页面
                    size: pagination.pageSize,
                }
            })
            console.log('response:', response);
            const data = await response.data.data
            console.log('data:', data);
            const totalResponse = await axios.get(`http://localhost:8080/api/carts/count/${userName}`)
            const total = await totalResponse.data.data
            console.log('total:', total);
            const allProducts = []
            for (let i = 0; i < data.length; i++) {
                const product = data[i]
                allProducts.push({
                    key: String(i),
                    name: product.productname,
                    brand: product.productDTO.brand,
                    category: product.productDTO.category,
                    price: product.productDTO.price,
                    quantity: product.quantity,
                })
            }
            // const allProducts = await data.map((product, idx, arr) => ({
            //         key: String(idx),
            //         name: product.productname,
            //         brand: product.productDTO.brand,
            //         category: product.productDTO.category,
            //         price: product.productDTO.price,
            //         quantity: product.quantity,
            //     }))
            setProducts(allProducts)
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