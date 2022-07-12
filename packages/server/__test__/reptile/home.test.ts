import fs from 'fs';
import path from 'path';
import { homeList, getTotal } from '../../task/reptile';

const html = fs.readFileSync(path.join(__dirname, './index.html'), 'utf-8');

test('home list', () => {
  const list = homeList(html);
  console.log(list);

  expect(Array.isArray(list)).toBeTruthy();
  expect(list[0]).toEqual({
    name: '滨奥花园',
    url: 'http://60.173.254.126:8888/detail/viewscheme/554',
    region: '新站区',
    startTime: new Date('2022/7/7 10:00:00').valueOf(),
    endTime: new Date('2022/7/10 10:00:00').valueOf(),
    total: 68,
    // 企业名称
    enterpriseName: '合肥招盛房地产开发有限公司',
    // 楼栋
    building: ['G12幢'],
    state: '正在登记',
  });
  expect(list.length).toBe(15);
});

test('total', () => {
  expect(getTotal(html)).toBe(411);
});
