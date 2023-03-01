/// <reference path="../../../../../global.d.ts" />

import { priceFiltering, getTemplate } from '../../../../notice/src/template/index.mjs';
import { filterAllData, filterNewData } from './building.js';

test(`priceFiltering`, () => {
  // data: Array<CurrentType>,
  // { floorPrice, ceilingPrice }: { floorPrice?: number; ceilingPrice?: number },
  const data: Array<any> = [
    {
      building: [
        {
          lowestPrice: {
            price: 1000000,
          },
          highestPrice: {
            price: 2000000,
          },
        },
        {
          lowestPrice: {
            price: 2000000,
          },
          highestPrice: {
            price: 3000000,
          },
        },
      ],
    },
  ];

  expect(priceFiltering(data)[0].building.length).toBe(2);

  expect(priceFiltering(data, { floorPrice: 1000000 })[0].building.length).toBe(2);
  expect(priceFiltering(data, { floorPrice: 3000001 }).length).toBe(0);
  expect(priceFiltering(data, { floorPrice: 3000000 })[0].building.length).toBe(1);

  expect(priceFiltering(data, { ceilingPrice: 3000000 })[0].building.length).toBe(2);
  expect(priceFiltering(data, { ceilingPrice: 1000000 })[0].building.length).toBe(1);
  expect(priceFiltering(data, { ceilingPrice: 999999 }).length).toBe(0);

  expect(priceFiltering(data, { floorPrice: 100000, ceilingPrice: 1000000 })[0].building.length).toBe(1);
  expect(priceFiltering(data, { floorPrice: 100000, ceilingPrice: 2000000 })[0].building.length).toBe(2);

  expect(priceFiltering(data, { floorPrice: 10000, ceilingPrice: 20000 }).length).toBe(0);
  expect(priceFiltering(data, { floorPrice: 3000001, ceilingPrice: 4000000 }).length).toBe(0);

  expect(priceFiltering(data, { floorPrice: 2000000, ceilingPrice: 3000000 })[0].building.length).toBe(2);
  expect(priceFiltering(data, { floorPrice: 3000000, ceilingPrice: 4000000 })[0].building.length).toBe(1);
});

test('template', () => {
  const html = getTemplate(filterNewData, filterAllData);
  expect(html.includes('本次新增楼盘 1 个')).toBeTruthy();
  expect(html).not.toMatch(/所有楼盘/);
  expect(getTemplate([], [])).not.toMatch(/新增楼盘|所有楼盘/);
  expect(getTemplate(filterAllData, [])).toMatch('本次新增楼盘 1 个');
  expect(getTemplate(filterAllData, [])).not.toMatch(/所有楼盘/);
  expect(getTemplate([], filterNewData)).not.toMatch(/新增楼盘/);
  expect(getTemplate([], filterNewData)).not.toMatch('所有楼盘 1 个');

  const newAll = [...filterAllData].map((f: any, index: number) => {
    return {
      ...f,
      id: `${index}`,
    };
  });

  expect(getTemplate(filterNewData, newAll)).toMatch('本次新增楼盘 1 个');
  expect(getTemplate(filterNewData, newAll)).toMatch('所有楼盘 1 个');
});
