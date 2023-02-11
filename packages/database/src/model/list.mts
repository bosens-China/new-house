import { Schema, model, Require_id } from 'mongoose';

export interface Data {
  id: string;
  name: string;
  link: string;
  building: Array<string>;
  enterprise: string;
  region: string;
  startTime: number;
  startTimeStr: string;
  endTime: number;
  endTimeStr: string;
  total: number;
  state: '正在登记' | '暂未开始' | '登记结束';
}

export const listSchema = new Schema<Data>({
  id: { type: String, required: false },
  name: { type: String, required: false },
  link: { type: String, required: false },
  building: { type: [String], required: false },
  enterprise: { type: String, required: false },
  region: { type: String, required: false },
  startTime: { type: Number, required: false },
  endTime: { type: Number, required: false },
  startTimeStr: { type: String, required: false },
  endTimeStr: { type: String, required: false },
  total: { type: Number, required: false },
  state: { type: String, required: false },
});

export const List = model<Data>('List', listSchema);
export type RootData = Require_id<Data>;
