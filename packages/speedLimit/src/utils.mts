import type { Options } from './alone.mjs';
import { defaultOptions } from './config.mjs';

export const sleep = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined);
    }, time);
  });
};

export const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getOptions = (options: Partial<Options>) => {
  return {
    ...defaultOptions,
    ...options,
  };
};
