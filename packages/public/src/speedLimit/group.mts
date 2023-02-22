import { Fn } from './alone.mjs';

export interface currentOptions {
  onChange: (index: number, total: number) => void;
}

export const group = async <T extends Fn>(arr: Array<T>, options: Partial<currentOptions> = {}) => {
  const returnValues: Array<Awaited<ReturnType<T>>> = [];
  const { onChange } = options;
  for (let i = 0; i < arr.length; i++) {
    const el = arr[i];
    if (typeof el !== 'function') {
      throw new Error(`The value passed for group is not a function!`);
    }
    const result = await el(options);
    if (typeof onChange === 'function') {
      onChange(i, arr.length);
    }
    returnValues.push(result);
  }
  return returnValues;
};
