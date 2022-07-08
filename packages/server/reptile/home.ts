import { load } from 'cheerio';
import dayjs from 'dayjs';
import type { Data } from '../database/home';

const trim = (str: string) => str.replace(/^\s*|\s*$/g, '');

export const TOTAL_PAGE = 15;

export const getTotal = (html: string) => {
  const $ = load(html);
  const str = $('.green-black a:first-child').text();
  return Number(str.match(/\d+/g));
};

export const homeList = (html: string) => {
  const $ = load(html);
  const list = $('tbody tr:not(.table_bg)');
  const arr: Array<Data> = [];
  list.each((i, el) => {
    const td = $(el).find('td');
    // 第一个为链接需要特殊处理下
    const link = td.eq(0).find('a');
    const name = link.text();
    const url = link.attr('href') || '';
    const building = td.eq(1).text().split(',');
    const enterpriseName = td.eq(2).text();
    const region = td.eq(3).text();
    const time = td.eq(4).text().split('至') as [string, string];
    const total = td.eq(5).text();
    const state = td.eq(6).text();
    arr.push({
      name: trim(name),
      url: trim(url),
      region: trim(region),
      startTime: dayjs(trim(time[0])).valueOf(),
      endTime: dayjs(trim(time[1])).valueOf(),
      total: Number(trim(total)),
      building: building.map((item) => trim(item)),
      enterpriseName: trim(enterpriseName),
      state: trim(state) as Data['state'],
    });
  });

  return arr;
};
