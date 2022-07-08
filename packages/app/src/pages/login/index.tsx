import { Button, Checkbox, Form, Input, Tabs, TabsProps } from 'antd';
import React, { useState } from 'react';
import './style.less';

const { TabPane } = Tabs;

const Login = () => {
  const [state, setState] = useState('1');
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onChange: TabsProps['onChange'] = (e) => {
    setState(e);
    form.resetFields();
  };

  return (
    <div className="login">
      <Form
        form={form}
        className="login-form"
        name="login"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Tabs size="large" activeKey={state} onChange={onChange}>
          <TabPane tab="登录" key="1" />
          <TabPane tab="注册" key="2" />
        </Tabs>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: '请输入用户名!',
            },
          ]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: '请输入密码!',
            },
          ]}
        >
          <Input.Password placeholder="请输入密码" />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox
            style={{
              display: state !== '1' ? 'none' : undefined,
            }}
          >
            记住用户名和密码
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            {state === '1' ? '登录' : '注册'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
