import { ref } from '@vue/reactivity';

// 清闲 | 正在进行
export type State = 'free' | 'haveInHand';

export const state = ref<State>('free');
