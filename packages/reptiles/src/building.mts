import { load } from 'cheerio';
import dayjs from 'dayjs';
import { getBuilding, getHouses } from './api/index.mjs';
import { group } from '@new-house/speed-limit';
import { housingSupplement } from '@new-house/database/model/building';
import { Building, Data } from '@new-house/database/model/building';

export const transformation = (html: string) => {
  const $ = load(html, null, false);
  // 获取详细信息
  const all = $('li p');
  //  地上层数
  const floors: number = Number.parseFloat(all.eq(1).find('span').eq(0).text());
  //地下层数
  const numberOfBasementFloors: number = Number.parseFloat(all.eq(1).find('span').eq(1).text());
  // 土地使用权证
  const landUseRightCertificate: string = all.eq(2).find('span').text().trim();
  // 规划许可证
  const planningPermit: string = all.eq(4).find('span').text().trim();
  // 预售许可面积
  const preSaleLicensedArea: string = all.eq(5).find('span').text().trim();
  // 建筑结构
  const buildingStructure: string = all.eq(6).find('span').text().trim();
  // 网上销售总面积
  const totalAreaSoldOnline: string = all.eq(7).find('span').text().trim();
  // 设计单位
  const designUnit: string = all.eq(10).find('span').text().trim();
  // 代理销售企业
  const agentSalesCompany: string = all.eq(11).find('span').text().trim();
  // 竣工日期
  const completionDate: number = dayjs(all.eq(12).find('span').text().trim()).valueOf();
  // 交付日期
  const deliveryDate: number = dayjs(all.eq(13).find('span').text().trim()).valueOf();
  // 返回所有层的信息，注意是有id的
  const layers = $('.cursor')
    .map((i, el) => {
      const key = $(el).attr('onclick')?.match(/\d+/g)?.[0] || '';
      return key;
    })
    .toArray()
    .filter((f) => f && f !== '0');
  return {
    floors,
    numberOfBasementFloors,
    landUseRightCertificate,
    planningPermit,
    preSaleLicensedArea,
    buildingStructure,
    totalAreaSoldOnline,
    designUnit,
    agentSalesCompany,
    completionDate,
    deliveryDate,
    layers,
  };
};

export default async (link: string) => {
  const html = await getBuilding(link);
  const { layers, ...rest } = transformation(html);
  const all = await group(
    layers.map((f) => {
      return () => getHouses(f);
    }),
    {
      onChange(index, total) {
        console.log(`当前爬取楼幢进度：${+(index / total).toFixed(2) * 100}%`);
      },
      time: '0',
    },
  );
  // 过滤一下，只计算可售的
  const sort = all
    .filter((f) => {
      return f.iPrice && f.lbBuildArea && f.lbSellFlag === '可售';
    })
    .map((f) => {
      return {
        ...f,
        price: Number.parseFloat(f.iPrice) * Number.parseFloat(f.lbBuildArea),
      };
    })
    .sort((x, y) => x.price - y.price);
  // 计算最高价，最低价和均价
  const lowestPrice: housingSupplement = sort.at(0)!;
  // 最高价
  const highestPrice: housingSupplement = sort.at(-1)!;
  // 均价
  const averagePrice: number = sort.reduce((x, y) => (x += y.price), 0) / sort.length;
  const obj: Data = {
    ...rest,
    lowestPrice,
    highestPrice,
    averagePrice,
    parentLink: link,
  };

  await Building.insertMany([obj]);
};
