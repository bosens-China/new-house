/*
 * 配置信息，注意只有超级用户有权限修改
 */

import { Schema, model } from 'mongoose';

// Document interface
export interface Data {
  crontab: string;
  html: string;
  style: string;
  ignoredNumber: number;
}

// Schema
const schema = new Schema<Data>({
  crontab: { type: String, required: false },
  html: { type: String, required: false },
  style: { type: String, required: false },
  // 忽略的前置总数，因为只是拉取新的数据，所以前置的数据忽略
  ignoredNumber: { type: Number, required: false },
});

const Model = model('Config', schema);
export default Model;
