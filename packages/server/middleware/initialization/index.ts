import { Context, Next } from 'koa';
import mongoose from 'mongoose';
import db from '../../model/users';
import { encryption } from '../../router/utils';

const connect = () => {
  const url = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:${process.env.MONGO_INITDB_ROOT_PORT}/house?authSource=admin`;
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
  console.log(`超级用户创建成功`);
};

export default async () => {
  await Promise.all([connect(), writeIn()]);
  // 连接数据库写入超级账号
  return async (_ctx: Context, next: Next) => {
    await next();
  };
};
