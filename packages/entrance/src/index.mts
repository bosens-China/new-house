import mongoose from 'mongoose';
import { list } from '@new-house/reptiles';
import notice from '@new-house/notice';
import schedule from 'node-schedule';
import { Mail } from '@new-house/database/model/mail';
import { Data } from '@new-house/database/model/list';
import defaultMailbox from './defaultMailbox.mjs';
import { config } from 'dotenv';

await config();

const init = async () => {
  const { MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD, MONGO_INITDB_ROOT_PORT, MONGO_URL } = process.env;

  const url =
    MONGO_URL ||
    `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@localhost:${MONGO_INITDB_ROOT_PORT}/house?authSource=admin`;
  try {
    await mongoose.connect(url);
  } catch {
    throw new Error(`mongodb 连接失败 ${url}`);
  }
  console.log(`mongodb 连接成功 ${url}`);
  const mailbox = await Mail.find({}).lean();
  if (!mailbox.length) {
    await Mail.insertMany(defaultMailbox);
  }
};

// 是否正在执行中的标示
let starting = false;

const tasks = async () => {
  const diff = await list();
  const values = diff.filter((f) => f && f.state !== '登记结束') as Array<Data>;
  await notice(values);
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
