import { Format } from './gain.mjs';
import axios from 'axios';
import randomUseragent from 'random-useragent';
import { getTotal } from '../../function/list.mjs';
import { DETECTION_ADDRESS, TIMEOUT } from './constant.mjs';

export const setProxy = (proxy: Format) => {
  return {
    port: proxy.port,
    host: proxy.host,
    protocol: 'http',
  };
};

/*
 * 验证接口代理是否可用
 */
export const usability = async (proxy: Format) => {
  try {
    const { data } = await axios.get<string>(DETECTION_ADDRESS, {
      proxy: setProxy(proxy),
      headers: {
        'User-Agent': randomUseragent.getRandom(),
      },
      timeout: TIMEOUT,
    });

    // 验证返回的html是否正确
    if (!getTotal(data)) {
      return false;
    }
    return data;
  } catch (e) {
    return false;
  }
};
