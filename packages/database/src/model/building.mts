import { Schema, model, Require_id } from 'mongoose';

export interface Houses {
  lbInsideArea: string;
  lbHouseUsefulness: string;
  iPrice: string;
  lbSellFlag: string;
  lbLocation: string;
  sellflag: number;
  lbBuildArea: string;
  lbPartNO: string;
  lbJoinArea: string;
  lbHouseType: string;
  lbStructure: string;
  strTitle: string;
}

export type housingSupplement = Houses & { price: number };

export interface Data {
  parentLink: string;
  //  地上层数
  floors: number;
  //地下层数
  numberOfBasementFloors: number;
  // 土地使用权证
  landUseRightCertificate: string;
  // 规划许可证
  planningPermit: string;
  // 预售许可面积
  preSaleLicensedArea: string;
  // 建筑结构
  buildingStructure: string;
  // 网上销售总面积
  totalAreaSoldOnline: string;
  // 设计单位
  designUnit: string;
  // 代理销售企业
  agentSalesCompany: string;
  // 竣工日期
  completionDate: number;
  // 交付日期
  deliveryDate: number;
  // 最低价
  lowestPrice: housingSupplement;
  // 最高价
  highestPrice: housingSupplement;
  // 均价
  averagePrice: number;
}

export const HousesSchema = new Schema<housingSupplement>({
  lbInsideArea: { type: String, required: true },
  lbHouseUsefulness: { type: String, required: true },
  iPrice: { type: String, required: true },
  lbSellFlag: { type: String, required: true },
  lbLocation: { type: String, required: true },
  sellflag: { type: Number, required: true },
  lbBuildArea: { type: String, required: true },
  lbPartNO: { type: String, required: true },
  lbJoinArea: { type: String, required: true },
  lbHouseType: { type: String, required: true },
  lbStructure: { type: String, required: true },
  strTitle: { type: String, required: true },
  price: { type: Number, required: true },
});

export const buildingSchema = new Schema<Data>({
  parentLink: { type: String, required: true },
  floors: { type: Number, required: true },
  numberOfBasementFloors: { type: Number, required: true },
  landUseRightCertificate: { type: String, required: true },
  planningPermit: { type: String, required: true },
  preSaleLicensedArea: { type: String, required: true },
  buildingStructure: { type: String, required: true },
  totalAreaSoldOnline: { type: String, required: true },
  designUnit: { type: String, required: false },
  agentSalesCompany: { type: String, required: false },
  completionDate: { type: Number, required: true },
  deliveryDate: { type: Number, required: true },
  lowestPrice: { type: HousesSchema, required: true },
  highestPrice: { type: HousesSchema, required: true },
  averagePrice: { type: Number, required: true },
});

export const Building = model<Data>('building', buildingSchema);
export type RootData = Require_id<Data>;
