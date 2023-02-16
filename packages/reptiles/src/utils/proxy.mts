import axios, { AxiosProxyConfig } from 'axios';
import { alone } from '@new-house/speed-limit';
import randomUseragent from 'random-useragent';

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

/*
 * 作用就是生成一个可以使用的代理地址
 */
class Agent {
  private list: Map<string, Type & { runTime: number } & AxiosProxyConfig> = new Map();
  public interval = 6000;
  // 获取全部
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
      const { data } = await axios.get<string>(`http://60.173.254.126:8888`, {
        proxy,
        headers: {
          'User-Agent': randomUseragent.getRandom(),
        },
        timeout: this.interval,
      });
      return {
        ...proxy,
        html: data,
      };
    } catch {
      return false;
    }
  }

  // 获取一个可用的proxy配置项
  async obtain(): Promise<{
    html: string;
    host: string;
    port: number;
  }> {
    await this.init();
    const current = new Date().valueOf();
    for (const [name, value] of this.list) {
      if (!value.runTime || current - value.runTime >= this.interval) {
        const r = await this.asynctesting(value);
        if (r) {
          // 可以访问，更新下时间
          this.list.set(name, {
            ...value,
            runTime: current,
          });

          return r;
          // return value.proxy;
        } else {
          this.list.delete(name);
        }
      }
    }
    await alone(
      () => {
        //
      },
      { time: '100' },
    );
    return this.obtain();
  }

  // 刷新列表值
  private async refreshList() {
    const arr = await this.getAvailableAgents();
    for (const values of arr) {
      const { proxy } = values;
      if (!this.list.has(proxy)) {
        this.list.set(proxy, { ...values, runTime: 0 });
      }
    }
  }

  // 程序递归初始化，给list进行赋值
  private async init() {
    if (this.list.size >= 50) {
      return;
    }
    await this.refreshList();
  }
}

export default new Agent();
