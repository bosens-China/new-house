import { Schema, model, Require_id } from 'mongoose';

export interface Data {
  host: string;
  port: number;
  runTime: number;
  status: 'success' | 'fail';
}

export const agentPoolSchema = new Schema<Data>({
  host: { type: String, required: false },
  port: { type: Number, required: false },
  runTime: { type: Number, required: false },
  status: { type: String, required: false },
});

export const AgentPool = model<Data>('agentPool', agentPoolSchema);
export type RootData = Require_id<Data>;
