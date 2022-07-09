import { Schema, model } from 'mongoose';

export interface Data {
  name: string;
  url: string;
  region: string;
  startTime: number;
  endTime: number;
  total: number;
  // 企业名称
  enterpriseName: string;
  // 楼栋
  building: Array<string>;
  state: '正在登记' | '暂未开始' | '登记结束';
}

// Schema
const schema = new Schema<Data>({
  name: { type: String, required: true },
  url: { type: String, required: true },
  region: { type: String, required: true },
  startTime: { type: Number, required: true },
  endTime: { type: Number, required: true },
  total: { type: Number, required: true },
  enterpriseName: { type: String, required: true },
  building: { type: [String], required: true },
  state: { type: String, required: true },
});

const Model = model('Reptile', schema);
export default Model;
