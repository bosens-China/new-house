/*
 * 获取代理源，保证格式统一
 */

import axios from 'axios';

export interface Format {
  port: number;
  host: string;
  proxy: string;
}

export const ipproxypool = async (): Promise<Array<Format>> => {
  const { PROXY_IPPROXYPOOL } = process.env;
  type Root = [string, number, number][];
  const { data } = await axios.get<Root>(`${PROXY_IPPROXYPOOL}`);
  return data.map(([host, port]) => {
    return {
      host,
      port,
      proxy: `${host}:${port}`,
    };
  });
};

export const proxyPool = async (): Promise<Array<Format>> => {
  interface Type {
    anonymous: string;
    check_count: number;
    fail_count: number;
    https: boolean;
    last_status: boolean;
    last_time: string;
    proxy: string;
    region: string;
    source: string;
  }
  const { PROXY_PROXY_POOL } = process.env;
  const { data } = await axios.get<Array<Type>>(`${PROXY_PROXY_POOL}/all/`);
  const arr = data.map((f) => {
    const [host, port] = f.proxy.split(':') as [string, string];
    return {
      ...f,
      host,
      port: +port,
    };
  });
  return arr
    .filter((f) => {
      // 包含香港澳门这类的可能会有问题
      return f.host && f.port && !/香港|澳门|台湾/.test(f.region) && /中国/.test(f.region);
    })
    .map((f) => {
      return {
        host: f.host,
        port: f.port,
        proxy: f.proxy,
      };
    });
};
