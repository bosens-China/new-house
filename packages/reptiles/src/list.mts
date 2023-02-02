import { getList } from './api/index.mjs';
import { load } from 'cheerio';
import dayjs from 'dayjs';
import { Data, List } from '@new-house/database/model/list';
import 'dayjs/locale/zh-cn';
import { alone } from '@new-house/speed-limit';

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
      startTimeStr: dayjs(startTime).format('YYYY-MM-DD HH:mm:ss'),
      endTime,
      endTimeStr: dayjs(endTime).format('YYYY-MM-DD HH:mm:ss'),
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

// 每页的数量
const PAGE_SIZE = 15;

export default async () => {
  const currentList = await List.find({}).lean();
  const html = await alone(getList);
  const total = getTotal(html);
  const htmlArr = [html];
  // 计算还需要更新的页数
  const page = currentList.length ? Math.ceil((total - currentList.length) / PAGE_SIZE) : 0;
  if (page <= 0) {
    console.log(`当前列表值未更新`);
  }
  for (let index = 2; index < page; index++) {
    htmlArr.push(await alone(() => getList(index)));
  }
  // 将数组值解析成数组插入到数据库中
  const values = htmlArr.map((f) => transformation(f)).flat(2);
  const updateValues = [
    ...values,
    ...(currentList.length
      ? currentList.slice(values.length)
      : Array.from({
          length: total - values.length,
        })
    ).fill(null),
  ];
  await List.remove({});
  await List.insertMany(updateValues);
  // 返回此次更新的数据
  return updateValues.slice(0, total) as Array<Data>;
};
