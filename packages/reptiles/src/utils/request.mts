import axios from 'axios';
import randomUseragent from 'random-useragent';
import { alone } from '@new-house/public/speedLimit/index';
import proxy from './proxy.mjs';

export const BASE_URL = 'http://60.173.254.126:8888';

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
});

// 添加请求拦截器
instance.interceptors.request.use(async function (config) {
  config.headers.setUserAgent(randomUseragent.getRandom());
  // 设置代理
  config.proxy = await proxy.obtain();

  await alone(
    () => {
      //
    },
    { time: proxy.interval() },
  );
  return config;
});

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response;
  },
  async function (error) {
    if (!error?.config?.proxy) {
      return error;
    }

    proxy.invalidCleanup(error.config.proxy);
    return instance(error.config);
  },
);

export default instance;
