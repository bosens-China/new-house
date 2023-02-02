import { Schema, model } from 'mongoose';

export interface Data {
  mailbox: string;
  disable: boolean;
}

export const mailSchema = new Schema<Data>({
  mailbox: { type: String, required: true },
  disable: { type: Boolean, required: true },
});

export const Mail = model<Data>('Mail', mailSchema);
