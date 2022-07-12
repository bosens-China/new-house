import { MailOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SettingOutlined } from '@ant-design/icons';
import { Layout, Menu, MenuProps } from 'antd';
import React, { useMemo, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import './style.less';
import { selectUsers } from '@/store/users';

const { Header, Content, Sider } = Layout;

const View = () => {
  const [collapsed, setCollapsed] = useState(false);
  const users = useAppSelector(selectUsers);
  const location = useLocation();

  const navigate = useNavigate();
  const onClick: MenuProps['onClick'] = (e) => {
    navigate(e.key);
  };

  const items = useMemo(
    () => [
      {
        key: 'mailbox',
        icon: <MailOutlined />,
        label: '邮箱管理',
      },
      ...(users.root ? [{ key: 'SetUp', icon: <SettingOutlined />, label: '设置' }] : []),
    ],
    [users],
  );

  const selectedKeys = useMemo(() => {
    const { pathname } = location;
    const key = items.find((f) => pathname.includes(f.key))?.key;
    return key ? [key] : [];
  }, [location, items]);

  return (
    <Layout className="layout">
      <Sider trigger={null} collapsible collapsed={collapsed} className="layout-sider">
        <div className="logo" />
        <Menu theme="dark" mode="inline" selectedKeys={selectedKeys} onClick={onClick} items={items} />
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
