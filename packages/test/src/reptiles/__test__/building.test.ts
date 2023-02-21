import { transformation } from '../../../../reptiles/src/building.mjs';
import fs from 'fs';
import path from 'path';

const html = fs.readFileSync(path.join(__dirname, './building.html'), 'utf-8');

test(`transformation`, () => {
  const values = transformation(html);
  expect(values).toEqual({
    floors: 23,
    numberOfBasementFloors: 1,
    landUseRightCertificate: '皖（2022）合肥市不动产权第1238096号',
    planningPermit: '建字第340111202200741号',
    preSaleLicensedArea: '10164.88 ㎡',
    buildingStructure: '钢筋混凝土结构',
    totalAreaSoldOnline: '10164.88 ㎡',
    designUnit: '',
    agentSalesCompany: '',
    completionDate: new Date('2024/12/30').valueOf(),
    deliveryDate: new Date('2025/6/30').valueOf(),
    layers: expect.any(Array),
  });
});
