import schedule from 'node-schedule';
import { state } from '@new-house/public/state';

interface Options {
  // 初始执行
  initialExecution: boolean;
}

export const timing = (task: () => Promise<any>, options: Partial<Options> = {}) => {
  const { initialExecution = true } = options;

  const rule = new schedule.RecurrenceRule();
  rule.hour = [11, 15, 20];
  // 必须设置分钟和秒
  rule.minute = 0;
  rule.second = 0;

  const implement = () => {
    if (state.value === 'haveInHand') {
      return;
    }
    state.value = 'haveInHand';

    console.time('列表爬取时长');
    task()
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        state.value = 'free';

        console.timeEnd('列表爬取时长');
      });
  };

  if (initialExecution) {
    implement();
  }

  schedule.scheduleJob(rule, implement);
};
