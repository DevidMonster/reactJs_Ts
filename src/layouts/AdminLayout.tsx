import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  InboxOutlined,
  DashboardOutlined,
  SkinOutlined,
} from '@ant-design/icons';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Layout, Menu, theme, Image, Avatar, Button } from 'antd';

const { Header, Sider, Content } = Layout;

const items = [
  {
    key: '1',
    icon: <DashboardOutlined />,
    label: <Link to="/admin">DashBoard</Link>,
  },
  {
    key: '2',
    icon: <SkinOutlined />,
    label: 'Products',
    children:
      [
        {
          key: '3',
          icon: '',
          label: <Link to="/admin/products">Products</Link>
        },
        {
          key: '4',
          icon: '',
          label: <Link to="/admin/products/add">Add Product</Link>
        }
      ]
  },
  {
    key: '5',
    icon: <InboxOutlined />,
    label: 'Categories',
  },
]

const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate()
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  if (localStorage.getItem('token') === null || localStorage.getItem('user') === null) {
    navigate('/login')
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate("/login")
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" >
          <Image src='https://gw.alipayobjects.com/zos/bmw-prod/1c363c0b-17c6-4b00-881a-bc774df1ebeb.svg' />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: "0px 20px", background: colorBgContainer, display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
          <div>
            <Button onClick={handleLogout}>Logout</Button>
            <Avatar src="https://gw.alipayobjects.com/zos/bmw-prod/1c363c0b-17c6-4b00-881a-bc774df1ebeb.svg" size={50} />
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;