import mongoose from 'mongoose';
import { list, details, building, proxyConfig, proxy } from '@new-house/reptiles';
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
  console.log(`正在获取可用代理地址...`);
  // 获取可以使用的代理地址
  const { html, ...newProxy } = await proxy.obtain();
  Object.assign(proxyConfig, newProxy);
  console.log(`更新代理地址成功 ${JSON.stringify(newProxy)}`);
  console.time('列表爬取时长');
  const diff = await list(html);
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
  const priceBar = new ProgressBar('爬取楼幢价格 [:bar] :current/:total :percent  :elapseds', {
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

  await notice(values);
  console.log(`已成功发送邮件`);
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
