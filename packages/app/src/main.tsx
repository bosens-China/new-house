import React from 'react';
import ReactDOM from 'react-dom/client';
import 'antd/dist/antd.css';
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Routes from './routes';
import { persistor, store } from './store';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConfigProvider locale={zhCN}>
        <Routes />
      </ConfigProvider>
    </PersistGate>
  </Provider>,
);
