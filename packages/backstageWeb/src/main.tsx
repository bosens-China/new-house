import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import zhCN from 'antd/locale/zh_CN.js';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/index.js';
import 'antd/dist/reset.css';

dayjs.locale('zh-cn');

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN as any}>
      <RouterProvider router={router}></RouterProvider>
    </ConfigProvider>
  </React.StrictMode>,
);
