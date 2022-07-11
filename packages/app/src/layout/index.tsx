import { MailOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SettingOutlined } from '@ant-design/icons';
import { Layout, Menu, MenuProps } from 'antd';
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './style.less';

const { Header, Content, Sider } = Layout;

const View = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const onClick: MenuProps['onClick'] = (e) => {
    navigate(e.key);
  };
  return (
    <Layout className="layout">
      <Sider trigger={null} collapsible collapsed={collapsed} className="layout-sider">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['mailbox']}
          onClick={onClick}
          items={[
            {
              key: 'mailbox',
              icon: <MailOutlined />,
              label: '邮箱管理',
            },
            {
              key: 'SetUp',
              icon: <SettingOutlined />,
              label: '设置',
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
