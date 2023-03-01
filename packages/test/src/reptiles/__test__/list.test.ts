import { transformation, getTotal } from '../../../../reptiles/src/function//list.mjs';
import fs from 'fs';
import path from 'path';

const html = fs.readFileSync(path.join(__dirname, './list.html'), 'utf-8');

test(`transformation`, () => {
  const values = transformation(html);
  expect(values.length).toBe(15);
  expect(values[0]).toEqual({
    id: '2302008',
    name: '珺悦台',
    link: `http://60.173.254.126:8888/detail/viewscheme/768`,
    building: ['G2幢'],
    enterprise: '合肥和颂房地产开发有限公司',
    region: '包河区',
    startTime: new Date('2023/2/10 15:00:00').valueOf(),
    endTime: new Date('2023/2/13 15:00:00').valueOf(),
    startTimeStr: '2023-02-10 15:00:00',
    endTimeStr: '2023-02-13 15:00:00',
    total: 88,
    state: '暂未开始',
  });
});

test('getTotal', () => {
  expect(getTotal(html)).toBe(615);
});
