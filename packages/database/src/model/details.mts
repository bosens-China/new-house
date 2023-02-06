import { Schema, model, Types } from 'mongoose';

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
  parentId: Types.ObjectId;
}

export const buildingSchema = new Schema<Building>({
  licence: { type: String, required: true },
  name: { type: String, required: true },
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
    type: 'ObjectID',
    required: true,
  },
});

export const Details = model<Data>('details', detailsSchema);
