import React from 'react';
import ReactDOM from 'react-dom/client';
import 'antd/dist/antd.css';
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import { ConfigProvider } from 'antd';
import Routes from './routes';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ConfigProvider locale={zhCN}>
    <Routes />
  </ConfigProvider>,
);
