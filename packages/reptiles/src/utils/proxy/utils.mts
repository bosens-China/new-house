import { Format } from './gain.mjs';
import axios from 'axios';
import randomUseragent from 'random-useragent';
import { getTotal } from '../../function/list.mjs';
import { getRandomInt } from '@new-house/public/speedLimit/index';

/*
 * 验证接口代理是否可用
 */
export const usability = async (proxy: Format) => {
  try {
    const { data } = await axios.get<string>(`http://60.173.254.126:8888`, {
      proxy,
      headers: {
        'User-Agent': randomUseragent.getRandom(),
      },
      timeout: 6000,
    });
    // 验证返回的html是否正确
    if (!getTotal(data)) {
      return false;
    }
    return data;
  } catch {
    return false;
  }
};

/*
 * 获取随机间隔
 * 平均每个任务2-4s请求一次即可
 */
export const interval = (size: number) => {
  return Math.min(getRandomInt(6000 / size, 1200 / size), 1000);
};
