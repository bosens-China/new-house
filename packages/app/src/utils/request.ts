import { Response } from '@/global';
import axios, { AxiosResponse } from 'axios';
import { getToken } from './token';

const instance = axios.create({
  baseURL: '/api',
  timeout: 5000,
});

// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    const obj = config;
    obj.headers = {
      ...obj.headers,
      Authorization: getToken() || '',
    };
    return obj;
  },
  (error) => Promise.reject(error),
);

// 添加响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse<Response<unknown>>) => {
    const { data } = response;
    const { code, message } = data;
    switch (code) {
      case 403:
        window.location.href = '/login';
        return null;
      case 200:
        return response;
      default:
        return Promise.reject(message);
    }
  },
  (error) => Promise.reject(error),
);

export default instance;
