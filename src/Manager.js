import React, { useState, useEffect } from 'react';
import { Space, Table, Modal, Input, Button, Typography } from 'antd';
import axios from 'axios';

const { Title } = Typography;

const Manager = () => {
    const [refresh, setRefresh] = useState(false);
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 50,
    });
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newCategory, setNewCategory] = useState("");
    const [newPrice, setNewPrice] = useState("");
    const [addCategory, setAddCategory] = useState("");
    const [addPrice, setAddPrice] = useState("");
    const [addName, setAddName] = useState("");
    const [addBrand, setAddBrand] = useState("");
    const [currProductName, setCurrProductName] = useState("");
    const [currProductBrand, setCurrProductBrand] = useState("");

    useEffect(() => {
        console.log('pagination', pagination)
        // 模拟从API获取数据
        fetchAllProducts(pagination);
    }, [pagination.current, pagination.pageSize, pagination.total, refresh]);

    const showEditModal = (name, brand) => () => {
        setCurrProductName(name);
        setCurrProductBrand(brand);
        setIsEditModalOpen(true);
    };

    const showAddModal = () => {   
        setIsAddModalOpen(true);
    };

    const handleEditOk = async () => {
        console.log('newCategory:', newCategory);
        console.log('newPrice:', newPrice);

        const response = await axios.put('http://localhost:8080/api/products/update', {
            name: currProductName,
            brand: currProductBrand,
            category: newCategory,
            price: newPrice,
        })
        console.log('response:', response);
        setRefresh(!refresh);

        setNewCategory("");
        setNewPrice("");
        setCurrProductName("");
        setCurrProductBrand("");
        setIsEditModalOpen(false);
    };

    const handleEditCancel = () => {
        setNewCategory("");
        setNewPrice("");
        setIsEditModalOpen(false);
    };

    const handleAddOk = async () => {
        console.log('addName:', addName);
        console.log('addBrand:', addBrand);
        console.log('addCategory:', addCategory);
        console.log('addPrice:', addPrice);

        await axios.post('http://localhost:8080/api/products/add', {
            name: addName,
            brand: addBrand,
            category: addCategory,
            price: addPrice,
        })
        setRefresh(!refresh);
        
        setAddCategory("");
        setAddPrice("");
        setAddName("");
        setAddBrand("");
        setIsAddModalOpen(false);
    };

    const handleAddCancel = () => {
        setAddCategory("");
        setAddPrice("");
        setAddName("");
        setAddBrand("");
        setIsAddModalOpen(false);
    };

    const handleAddCategoryChange = (event) => {
        setAddCategory(event.target.value);
    }

    const handleAddBrandChange = (event) => {
        setAddBrand(event.target.value);
    }

    const handleAddPriceChange = (event) => {
        setAddPrice(event.target.value);
    }

    const handleAddNameChange = (event) => {
        setAddName(event.target.value);
    }

    const handleDelete = (name) => {
        return async () => {
            console.log('delete:', name);
            await axios.delete(`http://localhost:8080/api/products/${name}`)
            setRefresh(!refresh);
        }
    }
    
    const handleCategoryChange = (event) => {
        setNewCategory(event.target.value);
    }

    const handlePriceChange = (event) => {
        setNewPrice(event.target.value);
    }

    const fetchAllProducts = async (pagination) => {
        try {
            const response = await axios.get('http://localhost:8080/api/products/search', {
                params: {
                    page: pagination.current - 1,  
                    size: pagination.pageSize,
                }
            })
            const data = await response.data.content
            const total = await response.data.totalElements
            const products = data.map((product, idx) => {
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
                <a onClick={showEditModal(record.name, record.brand)}>Edit</a>
                <a onClick={handleDelete(record.name)}>Delete</a>
            </Space>
        ),
    },
    ];
    
    return (
        <div>
            <Title>Welcome, Manager</Title>
            <Button type="primary" onClick={showAddModal}>Add product</Button>
            <Table columns={columns} dataSource={products} pagination={pagination} onChange={handleTableChange} />
            <Modal title="Edit product information" open={isEditModalOpen} onOk={handleEditOk} onCancel={handleEditCancel}>
                <Input type="text" placeholder="Category" value={newCategory} onChange={handleCategoryChange} />
                <Input type="text" placeholder="Price" value={newPrice} onChange={handlePriceChange} />
            </Modal>
            <Modal title="Add product" open={isAddModalOpen} onOk={handleAddOk} onCancel={handleAddCancel}>
                <Input type="text" placeholder="Name" value={addName} onChange={handleAddNameChange} />
                <Input type="text" placeholder="Brand" value={addBrand} onChange={handleAddBrandChange} />
                <Input type="text" placeholder="Category" value={addCategory} onChange={handleAddCategoryChange} />
                <Input type="text" placeholder="Price" value={addPrice} onChange={handleAddPriceChange} />
            </Modal>
        </div>
    )
}

export default Manager;