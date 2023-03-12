import axios from 'axios';
import randomUseragent from 'random-useragent';
import { alone } from '@new-house/public/speedLimit/index';
import proxy from './proxy.mjs';
import { BASE_URL, TIMEOUT } from './constant.mjs';
import { setProxy } from './utils.mjs';

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
});

// 添加请求拦截器
instance.interceptors.request.use(async function (config) {
  config.headers.setUserAgent(randomUseragent.getRandom());
  /*
   * 这里是因为jest测试ora的时候抛出错误，暂时先这样解决
   */

  // 设置代理
  config.proxy = setProxy(await proxy.get());
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
    const values = response.config.proxy;
    if (!values) {
      return response;
    }
    const { port, host } = values;
    proxy.changeStatus(`${host}:${port}`, 'success');
    return response;
  },
  async function (error) {
    const values = error?.config?.proxy;
    if (!values) {
      return error;
    }
    const { host, port } = values;
    proxy.changeStatus(`${host}:${port}`, 'fail');
    return instance(error.config);
  },
);

export default instance;
