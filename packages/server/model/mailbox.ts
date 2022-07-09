import { Schema, Types, model } from 'mongoose';

// Document interface
export interface Data {
  parentId: Types.ObjectId;
  mailbox: string;
}

// Schema
const schema = new Schema<Data>({
  parentId: { type: 'ObjectId', required: true },
  mailbox: { type: String, required: true },
});

const Model = model('Mailbox', schema);
export default Model;
