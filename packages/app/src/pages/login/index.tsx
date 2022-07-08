import { RegisterBody, signIn, register } from '@/api/login';
import { Button, Checkbox, Form, Input, message, Tabs, TabsProps } from 'antd';
import React, { useState } from 'react';
import _ from 'lodash-es';
import { useLocalStorageState } from 'ahooks';
import { useNavigate } from 'react-router-dom';

import './style.less';
import { setToken } from '@/utils/token';

const { TabPane } = Tabs;

interface Values extends RegisterBody {
  remember: boolean;
}

const Login = () => {
  const [state, setState] = useState('1');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useLocalStorageState<Values>('user', {
    defaultValue: { remember: true, userName: '', password: '' },
  });
  const onFinish = (values: Values) => {
    const fn = state === '1' ? signIn : register;
    setLoading(true);
    fn(values)
      .then((res) => {
        if (_.isString(res)) {
          return;
        }
        setToken(res.token);
        setInitialValues(values.remember ? values : { remember: false, userName: '', password: '' });
        message.success(state === '1' ? '登录成功' : '注册成功');
        navigate('/mailbox');
      })
      .catch((err) => {
        message.error(err instanceof Error ? err.message : `${err}`);
      })
      .finally(() => {
        setLoading(false);
      });
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
        initialValues={initialValues}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Tabs size="large" activeKey={state} onChange={onChange}>
          <TabPane tab="登录" key="1" />
          <TabPane tab="注册" key="2" />
        </Tabs>
        <Form.Item
          name="userName"
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
          <Button block type="primary" htmlType="submit" loading={loading}>
            {state === '1' ? '登录' : '注册'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
