import React from 'react';
import { Layout, Menu, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import './style.less';
import logo from '@/assets/logo.png';

const { Header, Content } = Layout;

const items = [
  {
    key: '1',
    label: '订阅管理',
  },
];

const layout: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className="layout">
      <Header
        className="layout-header"
        style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%', display: 'flex' }}
      >
        <img className="logo" src={logo} alt="logo" height="64px" />

        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} items={items} />
      </Header>
      <Content className="layout-content" style={{ padding: '24px' }}>
        <div style={{ padding: 24, minHeight: 380, background: colorBgContainer }}>
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
};

export default layout;
