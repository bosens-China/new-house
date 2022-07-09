import { MailOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import './style.less';

const { Header, Content, Sider } = Layout;

const View = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout className="layout">
      <Sider trigger={null} collapsible collapsed={collapsed} className="layout-sider">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <MailOutlined />,
              label: '邮箱管理',
            },
          ]}
        />
      </Sider>
      <Layout
        className="layout-main"
        style={{
          marginLeft: !collapsed ? '200px' : '80px',
        }}
      >
        <Header className="layout-main-header">
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'layout-main-header-trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>
        <Content className="layout-main-main">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default View;
