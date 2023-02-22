import mongoose from 'mongoose';
import { Mail } from './model/mail.mjs';

import defaultMailbox from './defaultMailbox.mjs';

export const init = async () => {
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
  /*
   * 每次更新都把之前默认插入的数据删除，然后重新插入
   */

  for (const item of defaultMailbox) {
    await Mail.deleteMany({ mailbox: item.mailbox });
  }
  await Mail.insertMany(defaultMailbox);
};
