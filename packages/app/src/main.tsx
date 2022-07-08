import React from 'react';
import ReactDOM from 'react-dom/client';
import Routes from './routes';
import 'antd/dist/antd.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
);
