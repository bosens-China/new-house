import { getList } from './api/index.js';
import { load } from 'cheerio';
import dayjs from 'dayjs';
import { Data, List } from '@new-house/database/model/list';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');

// 将html转化为json
const transformation = (html: string) => {
  const $ = load(html, null, false);
  const arr: Array<Data> = [];
  const tr = $('tr:not(.table_bg)');
  tr.each((i, el) => {
    const td = $(el).find('td');
    const name = td.eq(0).find('a').text().trim();
    const link = td.eq(0).find('a').attr('href') || '';
    const building = td.eq(1).text().trim().split(',');
    const enterprise = td.eq(2).text().trim();
    const region = td.eq(3).text().trim();
    const [startTime, endTime] = td
      .eq(4)
      .text()
      .split('至')
      .map((f) => dayjs(f.trim()).valueOf()) as [number, number];

    const total = Number.parseFloat(td.eq(5).text());
    const state = td.eq(6).text() as Data['state'];
    arr.push({
      name,
      link,
      building,
      enterprise,
      region,
      startTime,
      endTime,
      total,
      state,
    });
  });
  return arr;
};

// 获取总数
const getTotal = (html: string) => {
  const $ = load(html, null, false);
  return Number.parseFloat($('.green-black em').text());
};

export default async () => {
  const currentList = await List.find({}).lean();
  // 如果不存在则
};
