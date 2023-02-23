import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

const NonExistent = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="抱歉访问的路由不存在"
      extra={
        <Link to="/">
          <Button type="primary">点击返回主页</Button>
        </Link>
      }
    />
  );
};

export default NonExistent;
