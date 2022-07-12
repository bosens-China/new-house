import { RegisterBody, signIn, register } from '@/api/login';
import { Button, Checkbox, Form, Input, message, Tabs, TabsProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocalStorageState, useRequest } from 'ahooks';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './style.less';
import { setToken } from '@/utils/token';
import { setRoot } from '@/store/users';

const { TabPane } = Tabs;

interface Values extends RegisterBody {
  remember: boolean;
}

const Login = () => {
  const [state, setState] = useState('1');
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = useLocalStorageState<Values>('user', {
    defaultValue: { remember: true, userName: '', password: '' },
  });
  const { loading: signInLoading, run: signInRun } = useRequest(signIn, {
    manual: true,
    onError(err) {
      message.error(err instanceof Error ? err.message : `${err}`);
    },
    onSuccess({ token, root }) {
      setToken(token);
      dispatch(setRoot(root));
      const values = form.getFieldsValue(true) as Values;
      setInitialValues(values.remember ? values : { remember: false, userName: '', password: '' });
      message.success('登录成功');
      navigate('/mailbox');
    },
  });
  const { loading: registerLoading, run: registerRun } = useRequest(register, {
    manual: true,
    onError(err) {
      message.error(err instanceof Error ? err.message : `${err}`);
    },
    onSuccess() {
      const values = form.getFieldsValue(true) as RegisterBody;
      setState('1');
      form.setFieldsValue(values);
      message.success('注册成功');
    },
  });

  const onFinish = (values: Values) => {
    const run = state === '1' ? signInRun : registerRun;
    run(values);
  };

  const onChange: TabsProps['onChange'] = (e) => {
    setState(e);
    form.resetFields();
  };
  useEffect(() => {
    setToken('');
  }, []);

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

        {state === '1' && (
          <>
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
              <Checkbox>记住用户名和密码</Checkbox>
            </Form.Item>
            <Form.Item>
              <Button block type="primary" htmlType="submit" loading={signInLoading}>
                登录
              </Button>
            </Form.Item>
          </>
        )}
        {state === '2' && (
          <>
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

            <Form.Item>
              <Button block type="primary" htmlType="submit" loading={registerLoading}>
                注册
              </Button>
            </Form.Item>
          </>
        )}
      </Form>
    </div>
  );
};

export default Login;
