import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import Products from './Products';
import Manager from './Manager';
import Cart from './Cart';
import 'antd/dist/reset.css'; // 引入Ant Design样式，确保取消注释

const { Header, Content } = Layout;

function App() {
  return (
    <Router>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1"><Link to="/products">商品</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/manager">管理员</Link></Menu.Item>
            <Menu.Item key="3"><Link to="/cart">购物车</Link></Menu.Item>
            {/* 可以添加更多的导航项 */}
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content">
            <Routes>
              <Route path="/products" element={<Products />} />
              <Route path="/manager" element={<Manager />} />
              <Route path="/cart" element={<Cart />} />
              {/* 这里可以根据需要添加更多的路由规则 */}
            </Routes>
          </div>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
