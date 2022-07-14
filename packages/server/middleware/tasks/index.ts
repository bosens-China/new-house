/* eslint-disable @typescript-eslint/restrict-template-expressions */
import schedule from 'node-schedule';
import { Context, Next } from 'koa';
import pull from './pull';
import notice from './notice';
import db from '../../model/config';
import { DEFAULT_VALUE } from '../../constant/config';

const task = async () => {
  const result = await db.findOne({});
  const crontab = result?.crontab || DEFAULT_VALUE.crontab;
  const next = async () => {
    const newData = await pull();
    await notice(newData);
  };
  let job = schedule.scheduleJob(crontab, next);
  // 如果传递的crontab错误，job为null
  if (!job) {
    job = schedule.scheduleJob(DEFAULT_VALUE.crontab, next);
  }
  // 初始运行执行一次
  await next();
};

// 执行定时任务
export default async () => {
  await task();
  console.log(`创建定时任务成功`);
  return async (ctx: Context, next: Next) => {
    await next();
  };
};
