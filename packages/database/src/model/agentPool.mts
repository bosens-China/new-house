import { Schema, model, Require_id } from 'mongoose';

export interface Data {
  port: number;
  host: string;
  proxy: string;
  status?: 'operation' | 'end';
  runTime?: number;
  numberOfFailures?: number;
}

export const agentPoolSchema = new Schema<Data>({
  proxy: { type: String, required: true },
  host: { type: String, required: true },
  port: { type: Number, required: true },
  runTime: { type: Number, required: false },
  status: { type: String, required: false },
  numberOfFailures: { type: Number, required: false },
});

export const AgentPool = model<Data>('agentPool', agentPoolSchema);
export type RootData = Require_id<Data>;
