import axios from 'axios';
import randomUseragent from 'random-useragent';
import axiosRetry from 'axios-retry';
import _ from 'lodash';

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

const wait = (time: number): Promise<boolean> =>
  new Promise((resolve) =>
    // eslint-disable-next-line no-promise-executor-return
    setTimeout(() => {
      resolve(true);
    }, time),
  );

// 添加响应拦截器
axios.interceptors.response.use(
  async (response) => {
    // 简单处理下爬虫爬取速度过快，随机间隔
    await wait(_.random(500, 30000));
    return response;
  },
  (error) =>
    // 对响应错误做点什么
    Promise.reject(error),
);

export default instance;
