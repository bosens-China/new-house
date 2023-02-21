import mongoose from 'mongoose';
import { list, details, building } from '@new-house/reptiles';
import notice from '@new-house/notice';
import schedule from 'node-schedule';
import { Mail } from '@new-house/database/model/mail';
// import { List } from '@new-house/database/model/list';
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
  const diff = await list();
  const values = diff.filter((f) => f && f.state !== '登记结束');
  if (!values.length) {
    console.log(`当前列表值未更新`);
    return;
  }
  console.log(`更新列表完成`);
  // 添加详情
  const detailValues = await group(values.map((f) => () => details(f.id)));
  console.log(`更新详情完成`);
  const links = detailValues
    .map((f) => f?.map((f) => f.building.map((f) => f.link)))
    .flat(3)
    .filter((f) => f) as Array<string>;

  const buildingbar = new ProgressBar('爬取楼幢页面 [:bar] :percent :elapseds', {
    complete: '=',
    incomplete: ' ',
    total: links.length,
    // clear: true,
    width: 50,
  });
  const allBuilding = await group(
    links.map((f) => () => building(f)),
    {
      onChange() {
        buildingbar.tick();
      },
    },
  );

  const total = allBuilding.reduce((x, item) => {
    return x + item.tasks.length;
  }, 0);
  const priceBar = new ProgressBar('爬取楼幢价格 [:bar] :current/:total :percent :rate :elapseds 预计完成时间：:etas', {
    complete: '=',
    incomplete: ' ',
    total,
    // clear: true,
    width: 50,
  });
  const onChange = () => {
    priceBar.tick();
  };
  const priceTasks = allBuilding.reduce((arr, item) => {
    arr.push(() => item.actuator(onChange));
    return arr;
  }, [] as (() => Promise<void>)[]);

  await group(priceTasks);

  console.log(`更新楼幢完成`);

  const notificationList = await notice(values);
  console.log(`已成功发送邮件 ${notificationList.length} 封`);
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
  process.emit('taskStart' as any);
  console.time('列表爬取时长');
  tasks()
    .catch((e) => {
      console.error(e);
    })
    .finally(() => {
      starting = false;
      process.emit('taskEnd' as any);
      console.timeEnd('列表爬取时长');
    });
};

// 初始启动一下
await init();
implement();
schedule.scheduleJob(rule, implement);
