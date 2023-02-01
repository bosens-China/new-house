// 单独限速

import { getOptions, sleep, getRandomInt } from './utils.js';

export type Fn = (...rest: Array<any>) => any;

export interface Options {
  time: string;
}

export const alone = async <T extends Fn>(fn: T, options: Partial<Options> = {}): Promise<ReturnType<T>> => {
  const { time } = getOptions(options);
  const [min, max = min] = time
    .split('-')
    .map((f) => Number(f) || 0)
    .sort((x, y) => x - y);

  const randomInt = getRandomInt(min, max);
  await sleep(randomInt);
  const result = await fn();
  return result;
};
