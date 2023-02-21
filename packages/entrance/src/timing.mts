import schedule from 'node-schedule';

interface Options {
  // 初始执行
  initialExecution: boolean;
}

export const timing = (task: () => Promise<any>, options: Partial<Options> = {}) => {
  const { initialExecution = true } = options;

  // 是否正在执行中的标示
  let starting = false;

  const rule = new schedule.RecurrenceRule();
  rule.hour = [11, 15, 20];
  // 必须设置分钟和秒
  rule.minute = 0;
  rule.second = 0;

  const implement = () => {
    if (starting) {
      return;
    }
    starting = true;
    process.emit('taskStart' as any);
    console.time('列表爬取时长');
    task()
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        starting = false;
        process.emit('taskEnd' as any);
        console.timeEnd('列表爬取时长');
      });
  };

  if (initialExecution) {
    implement();
  }

  schedule.scheduleJob(rule, implement);
};
