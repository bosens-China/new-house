import axios from 'axios';
import randomUseragent from 'random-useragent';
import { alone } from '@new-house/speed-limit';
import proxy from './config.mjs';

export const BASE_URL = 'http://60.173.254.126:8888';

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
});

// 添加请求拦截器
instance.interceptors.request.use(
  async function (config) {
    config.headers.setUserAgent(randomUseragent.getRandom());
    // 设置代理
    config.proxy = proxy;
    await alone(
      () => {
        //
      },
      { time: '6000-14000' },
    );
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

export default instance;
