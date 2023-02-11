import template from './index.ejs';
import ejs from 'ejs';
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

export default async (data: Array<RootData>) => {
  const newData: Array<CurrentType> = [];
  for (const item of data) {
    const details = await Details.findOne({ parentId: item._id }).lean();
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

  newData.map((f) => f.building.map((f) => f.averagePrice));
  const html = ejs.render(template, { data: newData, priceText, priceDescription });

  return html;
};
