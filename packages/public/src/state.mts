import { ref } from '@vue/reactivity';

// 清闲 | 正在进行
export type State = 'free' | 'haveInHand';

export const state = ref<State>('free');

/*
 * 是否为调试模式
 * 这里因为使用vscode所以简单粗暴判断了一下
 * 后续的话可以根据特定环境变量来区分
 * 调试模式下，任务会缩减到一两个这样，方便调试出问题
 */
export const isDebugger = () => {
  return 'VSCODE_INJECTION' in process.env;
};
