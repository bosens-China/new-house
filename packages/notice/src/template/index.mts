import template from './index.njk';
import nunjucks from 'nunjucks';
import { RootData } from '@new-house/database/model/list';
import { Details, RootData as DetailsRootData, Building as DetailsBuilding } from '@new-house/database/model/details';
import { Building, housingSupplement, RootData as BuildingRootData } from '@new-house/database/model/building';

export type CurrentType = Omit<RootData & DetailsRootData, 'building'> & {
  building: Array<DetailsBuilding & BuildingRootData>;
};

const priceText = (price: housingSupplement | number) => {
  return `${((typeof price === 'number' ? price : price.price) / 10000).toFixed(2)}w`;
};
const priceDescription = (price: housingSupplement) => {
  return `${priceText(price)} 房间 ${price.lbPartNO}`;
};

// 获取所有模板通知的数据
export const getData = async (data: Array<RootData>) => {
  const newData: Array<CurrentType> = [];
  for (const item of data) {
    const details = await Details.findOne({ parentId: item.id }).lean();
    if (!details) {
      continue;
    }

    await Promise.all(
      details.building.map(async (building) => {
        const values = await Building.findOne({ parentLink: building.link }).lean();
        // 如果找不到设置为null，然后通过filter过滤即可
        return Object.assign(building, values || { name: '' });
      }),
    );
    details.building = details.building.filter((f) => f.name);
    newData.push({
      ...item,
      ...details,
    } as any);
  }

  return newData;
};

export const getTemplate = (newData: Array<CurrentType>, allData: Array<CurrentType>) => {
  // 过滤掉新增的部分，求一个差集即可
  const newAll = allData.filter(({ id }) => !!newData.find((f) => f.id !== id));

  const html = nunjucks.renderString(template, { newData, newAll, priceText, priceDescription });

  return html;
};

// 根据价格来进行过滤

export const priceFiltering = (
  data: Array<CurrentType>,
  { floorPrice, ceilingPrice }: { floorPrice?: number; ceilingPrice?: number } = {},
) => {
  const newData: Array<CurrentType> = [];
  data.forEach((item) => {
    const vlaues = item.building.filter((f) => {
      // // 最低价
      // floorPrice?: number;
      // lowestPrice: housingSupplement;
      // // 最高价
      // ceilingPrice?: number;
      // highestPrice: housingSupplement;
      if (!floorPrice && !ceilingPrice) {
        return true;
      }
      // 如果同时存在，必须都满足
      if (floorPrice && ceilingPrice) {
        return f.highestPrice.price >= floorPrice && f.lowestPrice.price <= ceilingPrice;
      }
      if (floorPrice) {
        return f.highestPrice.price >= floorPrice;
      }
      if (ceilingPrice) {
        return f.lowestPrice.price <= ceilingPrice;
      }
    });
    if (vlaues.length) {
      newData.push({
        ...item,
        building: vlaues,
      });
    }
  });
  return newData;
};
