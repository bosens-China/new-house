import { Schema, model, Require_id } from 'mongoose';

export interface Data {
  mailbox: string;
  // 是否禁用
  disable: boolean;
  // 最高价格
  ceilingPrice?: number;
  // 最低价格
  floorPrice?: number;
  // 创建日期
  createdDate: number;
}

export const mailSchema = new Schema<Data>({
  mailbox: { type: String, required: true },
  disable: { type: Boolean, required: true },
  ceilingPrice: { type: Number, required: false },
  floorPrice: { type: Number, required: false },
  createdDate: { type: Number, required: true },
});

export const Mail = model<Data>('Mail', mailSchema);
export type RootData = Require_id<Data>;
