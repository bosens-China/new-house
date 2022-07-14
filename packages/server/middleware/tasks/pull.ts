import db from '../../model/reptile';
import configDb from '../../model/config';
import request from '../../utils/request';
import { homeList, getTotal, TOTAL_PAGE } from './reptile';

export default async () => {
  const { data: html } = await request.get<string>(`http://60.173.254.126:8888/?p=1&xmmc=&qy=&djzt=`);
  const total = getTotal(html);
  const { length } = await db.find({});
  const result = await configDb.findOne({});

  const ignoredNumber = result?.ignoredNumber || total - TOTAL_PAGE;
  if (!result) {
    await configDb.insertMany([
      {
        ignoredNumber,
      },
    ]);
  }
  if (result && !result.ignoredNumber) {
    await configDb.updateOne(
      {},
      {
        $set: { ignoredNumber: total },
      },
    );
  }

  const listData = homeList(html);
  // 取页面的总数 - 数据库已经存在的数据来判断还需要拉取几页

  const diffLength = total - length - ignoredNumber;
  // 还需要拉取几页数据
  const updatePages = Math.ceil(diffLength / TOTAL_PAGE) - 1;
  const updataList = await Promise.all(
    Array.from({ length: updatePages }).map((item, index) =>
      request.get<string>(`http://60.173.254.126:8888/?p=${index + 2}&xmmc=&qy=&djzt=`).then((res) => res.data),
    ),
  );
  updataList.forEach((str) => {
    const list = homeList(str);
    listData.push(...list);
  });
  // 取新增的数据，插入到数据库中
  const newData = listData.slice(0, diffLength);

  await db.insertMany(newData);
  // 返回新数据
  return newData;
};
