import { priceFiltering, getTemplate } from '../../../../notice/src/template/index.mjs';

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

// test('template', () => {
//   const data = [
//     {
//       id: '1',
//       name: 'name',
//       link: 'link',
//       enterprise: '企业',
//       region: '区域',
//       startTime: new Date().valueOf(),
//       startTimeStr: new Date().valueOf().toLocaleString(),
//       endTime: new Date().valueOf(),
//       endTimeStr: new Date().valueOf().toLocaleString(),
//       total: 100,
//       state: '正在登记',
//       building: [
//         {
//           licence: string;
//           name: string;
//           link: string;
//         }
//       ];
//     },
//   ];
// });
