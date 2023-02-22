// 单独限速

import { sleep, getRandomInt } from './utils.mjs';

export type Fn = (...rest: Array<any>) => any;

export interface Options {
  time: string | number;
}

export const alone = async <T extends Fn>(fn: T, options: Partial<Options> = {}): Promise<ReturnType<T>> => {
  const time = options.time ?? 100;
  const [min, max = min] = (
    typeof time === 'string'
      ? time
          .split('-')
          .map((f) => Number(f) || 0)
          .sort((x, y) => x - y)
      : [time, time]
  ) as [number, number];

  await sleep(getRandomInt(min, max));
  const result = await fn();
  return result;
};
