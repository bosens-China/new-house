// /*
//  * 随机返回代理池的数据
//  */
import { Data, AgentPool } from '@new-house/database/model/agentPool';
import { proxyPool, ipproxypool } from '../request/gain.mjs';
import { getRandomInt, sleep } from '@new-house/public/speedLimit/utils';
import { isDebugger } from '@new-house/public/state';
import { usability } from '../request/utils.mjs';
// import _ from 'lodash-es';
import { watch } from '@vue-reactivity/watch';
import { state } from '@new-house/public/state';

class Agent {
  // 成功间隔
  private successInterval = 5000;
  // 失败间隔，6h
  private failureInterval = 1000 * 60 * 60 * 6;
  // 空闲时间
  private freeTime = 1000 * 60 * 10;
  // 重试次数
  private retryCount = 3;
  // list最大的值
  private maximum = 1000;

  private list = new Map<string, Data>();

  // 添加代理池
  private async increase() {
    const all = (await Promise.all([proxyPool(), ipproxypool()])).flat(2);
    for (const iterator of all) {
      // 获取原来的值，之前可能有重试和runtime等参数
      const originalValue = this.list.get(this.getKey(iterator) || '');
      this.list.set(iterator.proxy, {
        ...originalValue,
        ...iterator,
      });
    }
  }

  // 获取一个可用的代理池配置
  private _get() {
    for (const [, value] of this.list) {
      // 如果进行中的任务则跳过这条
      if (value.status === 'operation' || (value.numberOfFailures || 0) >= this.retryCount) {
        continue;
      }
      const time = new Date().valueOf();
      // 这里如果超出说明可以过了限制时间
      if (time >= (value.runTime || time)) {
        // 同时设置为进行中
        value.status = 'operation';
        return value;
      }
    }
  }

  async get(): Promise<Data> {
    if (!this.list.size) {
      await this.init();
      await this.increase();
    }
    const values = this._get();
    if (!values) {
      // 1s 后继续重试，等待返回正确的值
      await sleep(1000);
      return this.get();
    }
    // 同时进行代理池检测是否可用
    const result = await usability(values);
    const key = this.getKey(values);
    if (!result) {
      this.changeStatus(key, 'fail');
      return this.get();
    }
    // 成功之后避免直接爬取，等待
    this.changeStatus(key, 'success');
    await this.save();
    return values;
  }

  private getKey(values: Data) {
    for (const [name, value] of this.list) {
      if (value === values) {
        return name;
      }
    }
  }

  // 更改状态
  changeStatus(key: string | undefined, status: 'success' | 'fail') {
    if (!key) {
      return;
    }
    const values = this.list.get(key);
    if (!values) {
      return;
    }
    values.status = 'end';
    values.runTime = new Date().valueOf() + (status === 'success' ? this.successInterval : this.failureInterval);
    if (status === 'fail') {
      values.numberOfFailures = (values.numberOfFailures || 0) + 1;
    } else {
      values.numberOfFailures = 0;
    }
  }

  // 程序初始化
  private async init() {
    if (isDebugger()) {
      return;
    }
    const arr = await AgentPool.find({}).lean();
    for (const iterator of arr) {
      this.list.set(iterator.proxy, iterator);
    }
  }

  /*
   * 获取随机间隔
   * 平均每个任务2-4s请求一次即可
   */
  interval() {
    const time = new Date().valueOf();
    const size = [...this.list.values()].filter(
      (f) => (f.numberOfFailures || 0) < this.retryCount && time - (f.runTime || time) >= 0,
    ).length;
    // 每个任务2-4s请求一次
    return Math.min(getRandomInt(6000 / size, 1200 / size), 1000);
  }

  constructor() {
    let time: NodeJS.Timeout | undefined;
    /*
     * 如果空闲的时候就多进行爬取，然后爬取的时候取消
     * 测试模式下取消一切流程
     */
    watch(
      () => state,
      (v) => {
        if (process.env.NODE_ENV === 'test') {
          return;
        }
        if (v.value === 'free') {
          time = setTimeout(async () => {
            await this.increase();
            // 空闲时间如果发现有超过重试的就清理
            if (
              this.list.size >= this.maximum &&
              [...this.list.values()].find((f) => f.runTime && f.runTime >= this.retryCount)
            ) {
              this.putInOrder();
            }

            await this.save();
          }, this.freeTime);
          return;
        }
        clearTimeout(time);
      },
      {
        immediate: true,
      },
    );
  }

  // 清理
  private putInOrder() {
    for (const [name, values] of this.list) {
      if ((values.numberOfFailures || 0) >= this.retryCount) {
        this.list.delete(name);
      }
    }
  }
  private async save() {
    await AgentPool.deleteMany({});
    await AgentPool.insertMany([...this.list.values()]);
  }
}

export default new Agent();
