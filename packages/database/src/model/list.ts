import { Schema, model } from 'mongoose';

export interface Data {
  name: string;
  link: string;
  building: Array<string>;
  enterprise: string;
  region: string;
  startTime: number;
  endTime: number;
  total: number;
  state: '正在登记' | '暂未开始' | '登记结束';
}

export const listSchema = new Schema<Data>({
  name: { type: String, required: true },
  link: { type: String, required: true },
  building: { type: [String], required: true },
  enterprise: { type: String, required: true },
  region: { type: String, required: true },
  startTime: { type: Number, required: true },
  endTime: { type: Number, required: true },
  total: { type: Number, required: true },
  state: { type: String, required: true },
});

export const List = model<Data>('User', listSchema);
