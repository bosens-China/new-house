import React from 'react';
import ReactDOM from 'react-dom/client';
import _ from 'lodash-es';

// eslint-disable-next-line no-promise-executor-return
const wait = (time = 0) => new Promise((resolve) => setTimeout(resolve, time));

export const getDom = async (dom: React.ReactNode) => {
  const div = document.createElement('div');
  ReactDOM.createRoot(div).render(dom);
  await wait();
  // 因为会返回转移的字符串防止注入攻击，所以这里需要反转译下
  return _.unescape(div.innerHTML);
};
