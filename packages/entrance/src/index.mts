import mongoose from 'mongoose';
import { list, details, building } from '@new-house/reptiles';
import notice from '@new-house/notice';
import schedule from 'node-schedule';
import { Mail } from '@new-house/database/model/mail';
import defaultMailbox from './defaultMailbox.mjs';
import { config } from 'dotenv';
import { group } from '@new-house/speed-limit';
import ProgressBar from 'progress';

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
  console.time('列表爬取时长');
  const diff = await list();
  const values = diff.filter((f) => f && f.state !== '登记结束');
  // 添加详情
  const detailValues = await group(
    values.map((f) => () => details(f._id)),
    { time: '0' },
  );
  console.log(`更新详情完成`);
  const links = detailValues
    .map((f) => f?.map((f) => f.building.map((f) => f.link)))
    .flat(3)
    .filter((f) => f) as Array<string>;

  const bar = new ProgressBar('[:bar] :percent :elapseds', {
    complete: '=',
    incomplete: ' ',
    total: links.length,
    clear: true,
  });

  await group(
    links.map(
      (f) => () =>
        building(f).then((data) => {
          bar.tick();
          return data;
        }),
    ),
    { time: '0' },
  );
  console.log(`更新楼幢完成`);
  await notice(values);
  console.timeEnd('列表爬取时长');
};

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
