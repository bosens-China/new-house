import { Schema, model } from 'mongoose';

export interface Data {
  userName: string;
  password: string;
  // 是否为超级账号
  root?: boolean;
}
// Schema
const schema = new Schema<Data>({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  root: Boolean,
});

const Model = model('Users', schema);
export default Model;
