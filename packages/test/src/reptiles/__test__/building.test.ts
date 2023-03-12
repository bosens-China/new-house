import { transformation } from '../../../../reptiles/src/function/building.mjs';
import html from './assets/building.js';

test(`transformation`, () => {
  const values = transformation(html);
  expect(values).toEqual({
    floors: 16,
    numberOfBasementFloors: 2,
    landUseRightCertificate: '皖（2023）合肥市不动产权第1000180号',
    planningPermit: '建字第340111202300127',
    preSaleLicensedArea: '7141.24 ㎡',
    buildingStructure: '钢筋混凝土结构',
    totalAreaSoldOnline: '7141.24 ㎡',
    designUnit: '',
    agentSalesCompany: '',
    completionDate: new Date('2025/5/30').valueOf(),
    deliveryDate: new Date('2025/8/31').valueOf(),
    layers: expect.any(Array),
  });
});
