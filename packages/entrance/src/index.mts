import mongoose from 'mongoose';
import { list } from '@new-house/reptiles';
import notice from '@new-house/notice';
import schedule from 'node-schedule';

// 开发环境下进行环境变量的导入
if (process.env.NODE_ENV !== 'production') {
  const { config } = await import('dotenv');
  config();
}

const init = async () => {
  const MONGO_INITDB_ROOT_USERNAME = process.env.MONGO_INITDB_ROOT_USERNAME;
  const MONGO_INITDB_ROOT_PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD;
  const MONGO_INITDB_ROOT_PORT = process.env.MONGO_INITDB_ROOT_PORT;

  await mongoose.connect(
    `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@localhost:${MONGO_INITDB_ROOT_PORT}/house`,
  );
  console.log(`mongodb 连接成功`);
};

// 是否正在执行中的标示
let starting = false;

const tasks = async () => {
  const diff = await list();
  await notice(diff);
};

const rule = new schedule.RecurrenceRule();
rule.hour = [11, 15, 20];

const implement = () => {
  if (starting) {
    return;
  }
  starting = true;
  tasks()
    .catch((e) => {
      console.error(e);
    })
    .finally(() => {
      starting = false;
    });
};

// 初始启动一下
await init();
implement();
schedule.scheduleJob(rule, implement);
