import axios, { AxiosProxyConfig } from 'axios';
import { alone, getRandomInt } from '@new-house/speed-limit';
import randomUseragent from 'random-useragent';
import { getTotal } from '../list.mjs';
// import ora from 'ora';

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

type ProxyConfig = Pick<AxiosProxyConfig, 'host' | 'port'> & { runTime: number };

/*
 * 作用就是生成一个可以使用的代理地址
 */
class Agent {
  public list: Map<string, Type & ProxyConfig> = new Map();
  // private spinner = ora('加载代理池中...');

  // 获取全部代理池数据
  private async getAvailableAgents() {
    const { PROXY_ADDRESS } = process.env;
    const { data } = await axios.get<Array<Type>>(`${PROXY_ADDRESS}/all/`);
    const arr = data.map((f) => {
      const [host, port] = f.proxy.split(':') as [string, string];
      return {
        ...f,
        host,
        port: +port,
      };
    });
    return arr.filter((f) => {
      // 包含香港澳门这类的可能会有问题
      return f.host && f.port && !/香港|澳门|台湾/.test(f.region) && /中国/.test(f.region);
    });
  }

  // 检测代理地址是否可用
  private async asynctesting({ host, port }: Pick<AxiosProxyConfig, 'host' | 'port'>) {
    const proxy = {
      host,
      port,
    };

    try {
      const current = new Date().valueOf();
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
      const end = new Date().valueOf();
      return {
        ...proxy,
        runEndTime: end - current,
      };
    } catch {
      return false;
    }
  }

  // 获取随机间隔
  interval() {
    const size = this.list.size;
    // 每个任务2-4s请求一次
    return Math.min(getRandomInt(6000 / size, 1200 / size), 1000);
  }

  async init() {
    // console.log(`正在获取可用代理地址...`);
    const arr = [...(await this.getAvailableAgents())];

    // 直接测试是否可以使用
    const values = await Promise.all(
      arr.map((f) => {
        return this.asynctesting(f).then((e) => {
          if (e) {
            return f;
          }
          return null;
        });
      }),
    );
    const current = new Date().valueOf();
    values
      .filter((f): f is Type & ProxyConfig => f !== null)
      .forEach(({ proxy, ...rest }) => {
        this.list.set(proxy, {
          ...rest,
          runTime: current,
          proxy,
        });
      });

    if (!this.list.size) {
      await alone(
        () => {
          //
        },
        { time: 3000 },
      );
      await this.init();
      return;
    }

    // console.log(`更新代理地址成功`);
  }

  // 获取一个可用的proxy配置项
  async obtain(): Promise<{
    host: string;
    port: number;
  }> {
    // this.spinner.text = `当前代理池数量为：${this.list.size} \n`;

    await this.init();
    const current = new Date().valueOf();
    const sort = [...this.list.values()].sort((x, y) => x.runTime - y.runTime);
    for (const item of sort) {
      const { port, host, runTime } = item;
      if (!runTime || current - runTime >= this.interval()) {
        item.runTime = current;
        return {
          host,
          port,
        };
      }
    }
    await alone(
      () => {
        //
      },
      { time: 100 },
    );
    return this.obtain();
  }

  constructor() {
    // 每次任务开始就清理一下
    process.on('taskStart', () => {
      this.list.clear();
      // this.spinner.start();
    });
    process.on('taskEnd', () => {
      // this.spinner.stop();
    });
  }

  invalidCleanup({ host, port }: Pick<AxiosProxyConfig, 'host' | 'port'>) {
    this.list.delete(`${host}:${port}`);
  }
}

export default new Agent();
