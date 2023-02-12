import { Schema, model, Require_id } from 'mongoose';

export interface Building {
  licence: string;
  name: string;
  link: string;
}

export interface Data {
  optionalNumber: number;
  contactNumber: Array<string>;
  addressOfSalesDepartment: string;
  building: Array<Building>;
  parentId: string;
}

export const buildingSchema = new Schema<Building>({
  licence: { type: String, required: true },
  name: { type: String, required: true },
  link: { type: String, required: true },
});

export const detailsSchema = new Schema<Data>({
  optionalNumber: { type: Number, required: true },
  contactNumber: { type: [String], required: true },
  addressOfSalesDepartment: { type: String, required: true },
  building: {
    type: [buildingSchema],
    required: true,
  },
  parentId: {
    type: String,
    required: true,
  },
});

export const Details = model<Data>('details', detailsSchema);
export type RootData = Require_id<Data>;
