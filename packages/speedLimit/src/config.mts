import type { Options } from './alone.mjs';
import { reactive } from '@vue/reactivity';

export const defaultOptions = reactive<Required<Options>>({
  time: '3000-9000',
});