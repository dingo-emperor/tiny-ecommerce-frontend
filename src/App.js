import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import Products from './Products';
import Manager from './Manager';
import Cart from './Cart';
import 'antd/dist/reset.css';

const { Header, Content } = Layout;

function App() {
  return (
    <Router>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1"><Link to="/products">Products</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/manager">Manager</Link></Menu.Item>
            <Menu.Item key="3"><Link to="/cart">Cart</Link></Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content">
            <Routes>
              <Route path="/products" element={<Products />} />
              <Route path="/manager" element={<Manager />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </div>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
