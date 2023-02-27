import axios, { AxiosResponse } from 'axios';
import type { Normal, Error } from '@new-house/backstage-api';

const instance = axios.create({
  baseURL: '/api',
  timeout: 5000,
});

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

const isNormal = (data: Normal | Error): data is Normal => {
  return data.statusCode === 200;
};

// 添加响应拦截器
instance.interceptors.response.use(
  function (response: AxiosResponse<Normal | Error>) {
    const { data } = response;
    if (!isNormal(data)) {
      throw new Error(data.message);
    }
    return response;
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  },
);

export default instance;
