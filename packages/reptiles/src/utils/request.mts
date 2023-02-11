import axios from 'axios';
import randomUseragent from 'random-useragent';

export const BASE_URL = 'http://60.173.254.126:8888';

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
});

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    config.headers.setUserAgent(randomUseragent.getRandom());
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

export default instance;
