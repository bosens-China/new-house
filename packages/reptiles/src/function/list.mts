import { getList } from '../api/index.mjs';
import { load } from 'cheerio';
import dayjs from 'dayjs';
import { Data, List } from '@new-house/database/model/list';
import 'dayjs/locale/zh-cn';
import { BASE_URL } from '../utils/request/constant.mjs';

dayjs.locale('zh-cn');

// 将html转化为json
export const transformation = (html: string) => {
  const $ = load(html, null, false);
  const arr: Array<Data> = [];
  const tr = $('tr:not(.table_bg)');
  tr.each((i, el) => {
    const td = $(el).find('td');
    const id = td.eq(0).find('span').text().trim();
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
    const state = td.eq(6).text().trim() as Data['state'];
    arr.push({
      id,
      name,
      link: `${BASE_URL}${link}`,
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
export const getTotal = (html: string) => {
  const $ = load(html, null, false);
  return Number.parseFloat($('.green-black em').text());
};

// 每页的数量
const PAGE_SIZE = 15;

// 如果传递有默认的则不再请求第一页
export default async (defaultHtml?: string) => {
  const currentList = await List.find({}).lean();
  const html = defaultHtml || (await getList());
  const total = getTotal(html);
  const htmlArr = [html];
  // 需要插入的条数
  const updateQuantity = total - currentList.length;
  // 计算还需要更新的页数
  const page = currentList.length ? Math.ceil(updateQuantity / PAGE_SIZE) : 1;
  if (page <= 0) {
    return [];
  }
  for (let index = 2; index < page; index++) {
    htmlArr.push(await getList(index));
  }
  // 讲更新的值插入数组中
  const values = htmlArr.map((f) => transformation(f)).flat(2);
  const updateValues = [
    // 这里需要注意，如果是插入模式则只更新指定数量
    ...(currentList.length ? values.slice(0, updateQuantity) : values),
    ...(currentList.length
      ? []
      : Array.from({
          length: total - values.length,
        })
    ).fill(null),
  ];

  const returnValues = await List.insertMany(updateValues);
  // 返回此次更新的数据
  return returnValues.slice(0, currentList.length ? total - currentList.length : values.length).map((f) => f.toJSON());
};
