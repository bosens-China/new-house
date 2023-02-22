import { Details, Data, Building } from '@new-house/database/model/details';
import { List } from '@new-house/database/model/list';
import { getDetails } from '../api/index.mjs';
import { load } from 'cheerio';
import { BASE_URL } from '../utils/request.mjs';

// 列表返回的是刚需供应数：22形式，获取：之后的内容
const getTextDetails = (str: string) => {
  return str.trim().split('：')[1] as string;
};

export const transformation = (html: string): Omit<Data, 'parentId'> => {
  const $ = load(html, null, false);
  // 刚需供应数量
  const optionalNumber = Number.parseFloat(getTextDetails($('.lbox dd').eq(3).text()));
  // 联系电话
  const contactNumber: Array<string> = getTextDetails($('.lbox dd').eq(5).text()).split(/[^\d-]/g);
  // 售楼部地址
  const addressOfSalesDepartment = getTextDetails($('.lbox dd').eq(6).text());
  const building: Array<Building> = [];
  $('td').each((i, el) => {
    const link = $(el).find('a').attr('href') || '';
    const txt = $(el).find('span').text().trim();
    // 预售许可证号：20221251,楼幢：1-G3幢
    const [, licence, name] = txt.match(/[\s\S]+：(.+?),[\s\S]+：(.+?)$/) as [string, string, string];
    building.push({
      link: `${BASE_URL}${link}`,
      name,
      licence,
    });
  });
  return {
    optionalNumber,
    contactNumber,
    addressOfSalesDepartment,
    building,
  };
};

/*
 * 把列表的值进行额外补充
 */
export default async (id: string) => {
  const result = await List.findOne({ id });
  if (!result) {
    return;
  }
  const { link } = result;
  const html = await getDetails(link);
  const rest = transformation(html);

  const values = await Details.insertMany([
    {
      ...rest,
      parentId: id,
    },
  ]);
  return values;
};
