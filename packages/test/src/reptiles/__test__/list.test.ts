import { transformation, getTotal } from '../../../../reptiles/src/function//list.mjs';
import html from './assets/list.js';

test(`transformation`, () => {
  const values = transformation(html);
  expect(values.length).toBe(15);
  expect(values[0]).toEqual({
    id: '2303016',
    name: '璟庭里',
    link: `https://www.hfzfzlw.com/spf/detail/viewscheme/809`,
    building: ['6幢'],
    enterprise: '合肥鸣科房地产有限责任公司',
    region: '滨湖区',
    startTime: new Date('2023/3/11 16:00:00').valueOf(),
    endTime: new Date('2023/3/15 16:00:00').valueOf(),
    startTimeStr: '2023-03-11 16:00:00',
    endTimeStr: '2023-03-15 16:00:00',
    total: 60,
    state: '正在登记',
  });
});

test('getTotal', () => {
  expect(getTotal(html)).toBe(656);
});
