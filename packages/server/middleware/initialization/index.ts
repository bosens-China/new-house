import { Context, Next } from 'koa';
import mongoose from 'mongoose';
import db from '../../model/users';
import dbConfig from '../../model/config';
import { encryption } from '../../router/utils';

const connect = () => {
  const url = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:${process.env.MONGO_INITDB_ROOT_PORT}/house?authSource=admin`;
  console.log(url);

  mongoose.connect(url).catch(() => {
    console.log(`连接数据库出现问题`);
  });
};

const writeIn = async () => {
  const { SUPER_ACCOUNT, SUPER_ACCOUNT_PASSWORD } = process.env;

  if (!SUPER_ACCOUNT || !SUPER_ACCOUNT_PASSWORD) {
    return;
  }

  const result = await db.findOne({ userName: SUPER_ACCOUNT });
  if (result) {
    return;
  }
  await db.insertMany([
    {
      userName: SUPER_ACCOUNT,
      password: encryption(SUPER_ACCOUNT_PASSWORD),
      root: true,
    },
  ]);
};

const writeInConfig = async () => {
  const defaultTemplate = `
<ol>
<% _.forEach(data, function(item) { %>
<li>
  <div>名称：<a href="<%- item.url %>"><%- item.name %></a></span>
  <div>区域：<%- item.region %></span>
  <div>开始时间：<%- item.startTimeStr %></span>
  <div>结束时间：<%- item.endTimeStr %></span>
  <div>总套数：<%- item.total %></span>
  <div>企业名称：<%- item.enterpriseName %></span>
  <div>开放楼栋：<%- item.building %></span>
  <div>登记状态：<%- item.state %></span>
</li>
<% }); %>
</ol>
`;
  const result = await dbConfig.findOne({});
  if (result) {
    return;
  }
  await dbConfig.insertMany([
    {
      html: defaultTemplate,
      crontab: '*/60 * * * *',
      style: '',
    },
  ]);
};

export default () => {
  Promise.all([connect(), writeIn(), writeInConfig()]).catch((e) => {
    console.log(`执行初始化发生错误${e instanceof Error ? e.message : String(e)}`);
  });
  // 连接数据库写入超级账号
  return async (_ctx: Context, next: Next) => {
    await next();
  };
};
