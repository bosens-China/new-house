/*
 * 配置信息，注意只有超级用户有权限修改
 */

import { Schema, model } from 'mongoose';

// Document interface
export interface Data {
  crontab: string;
  html: string;
  style: string;
}

// Schema
const schema = new Schema<Data>({
  crontab: { type: String, required: false },
  html: { type: String, required: false },
  style: { type: String, required: false },
});

const Model = model('Config', schema);
export default Model;
