import { Schema, model } from 'mongoose';

export interface Data {
  // 名称
  name: string;
  // 链接地址
  url: string;
  // 区域
  region: string;
  // 开始时间
  startTime: number;
  // 结束时间
  endTime: number;
  // 总套数
  total: number;
  // 企业名称
  enterpriseName: string;
  // 楼栋
  building: Array<string>;
  // 登记状态
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
