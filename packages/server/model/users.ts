import { Schema, model } from 'mongoose';

export interface Data {
  userName: string;
  password: string;
}
// Schema
const schema = new Schema<Data>({
  userName: { type: String, required: true },
  password: { type: String, required: true },
});

const Model = model('Users', schema);
export default Model;
