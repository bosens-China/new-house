/*
 * 随机返回代理池的数据
 */
import { Data, AgentPool } from '@new-house/database/model/agentPool';
import { proxyPool, ipproxypool, Format } from './gain.mjs';
import { usability } from './utils.mjs';
import Catch from './catch.mjs';

class Agent {
  arr: Array<Data> = [];
  // 成功间隔
  successInterval = 5000;
  // 失败间隔
  failureInterval = 1000 * 60;

  catchUsability = new Catch();

  async init() {
    const arr = await AgentPool.find({}).lean();
    const results = await Promise.all(
      arr.map(async (f) => {
        const value = await usability({ ...f, proxy: `${f.host}:${f.port}` });
        const time = new Date().valueOf();
        if (value) {
        }
      }),
    );
  }

  // 获取ip代理池
  async gain() {
    const all = (await Promise.all([proxyPool(), ipproxypool()])).flat(2);
  }
}

export default new Agent();
