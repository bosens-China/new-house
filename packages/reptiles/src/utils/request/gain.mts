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
  try {
    const { data } = await axios.get<Root>(`${PROXY_IPPROXYPOOL}`);
    return data.map(([host, port]) => {
      return {
        host,
        port,
        proxy: `${host}:${port}`,
      };
    });
  } catch {
    throw new Error(`连接 PROXY_IPPROXYPOOL 失败，请检查env填写是否正确，当前值为：${PROXY_IPPROXYPOOL}`);
  }
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
  try {
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
  } catch {
    throw new Error(`连接 PROXY_PROXY_POOL 失败，请检查env填写是否正确，当前值为：${PROXY_PROXY_POOL}`);
  }
};
