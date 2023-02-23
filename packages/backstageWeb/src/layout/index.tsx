import React from 'react';
import { Layout, Menu, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import './style.less';

const { Header, Content } = Layout;

const layout: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="layout">
      <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
        <div
          style={{
            float: 'left',
            width: 120,
            height: 31,
            margin: '16px 24px 16px 0',
            background: 'rgba(255, 255, 255, 0.2)',
          }}
        />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={new Array(3).fill(null).map((_, index) => ({
            key: String(index + 1),
            label: `nav ${index + 1}`,
          }))}
        />
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
