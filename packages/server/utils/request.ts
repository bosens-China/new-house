import axios from 'axios';
import randomUseragent from 'random-useragent';
import axiosRetry from 'axios-retry';

const instance = axios.create({
  baseURL: 'http://60.173.254.126:8888/',
  timeout: 8000,
});

// 添加错误重试
axiosRetry(instance, { retries: 3 });

instance.interceptors.request.use(
  (config) => {
    const obj = config;
    obj.headers = {
      ...obj.headers,
      'User-Agent': randomUseragent.getRandom(),
    };
    return obj;
  },
  (error) => Promise.reject(error),
);

export default instance;
