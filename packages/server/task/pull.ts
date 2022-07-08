import db from '../database/home';
import request from '../utils/request';
import { homeList, getTotal, TOTAL_PAGE } from '../reptile/home';

await (async () => {
  const { data: html } = await request.get<string>(`http://60.173.254.126:8888/?p=1&xmmc=&qy=&djzt=`);
  const listData = homeList(html);
  const total = getTotal(html);
  // 取页面的总数 - 数据库已经存在的数据来判断还需要拉取几页
  await db.read();
  db.data ||= [];
  const diffLength = total - db.data.length;
  if (!diffLength) {
    return;
  }
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
  db.data.unshift(...newData);
  await db.write();
  // 通知变更
})();
