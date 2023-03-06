import building from './function/building.mjs';
import details from './function/details.mjs';
import list from './function/list.mjs';
import notice from '@new-house/notice';
import { group } from '@new-house/public/speedLimit/index';
import ProgressBar from 'progress';
import { isDebugger } from '@new-house/public/state';

export const task = async () => {
  const diff = await list();
  const values = diff.filter((f) => f && f.state !== '登记结束');
  // 调试模式下，直接缩减任务
  if (isDebugger()) {
    values.length = 1;
  }

  if (!values.length) {
    console.log(`当前列表值未更新`);
    return;
  }
  console.log(`更新列表完成`);
  // 添加详情
  const detailValues = await group(values.map((f) => () => details(f.id)));
  console.log(`更新详情完成`);
  const links = detailValues
    .map((f) => f?.map((f) => f.building.map((f) => f.link)))
    .flat(3)
    .filter((f) => f) as Array<string>;

  const buildingbar = new ProgressBar('爬取楼幢页面 [:bar] :percent :elapseds', {
    complete: '=',
    incomplete: ' ',
    total: links.length,
    // clear: true,
    width: 50,
  });
  const allBuilding = await group(
    links.map((f) => () => building(f)),
    {
      onChange() {
        buildingbar.tick();
      },
    },
  );

  const total = allBuilding.reduce((x, item) => {
    return x + item.tasks.length;
  }, 0);
  const priceBar = new ProgressBar('爬取楼幢价格 [:bar] :current/:total :percent 总耗时 :elapseds', {
    complete: '=',
    incomplete: ' ',
    total,
    // clear: true,
    width: 50,
  });
  const onChange = () => {
    priceBar.tick();
  };
  const priceTasks = allBuilding.reduce((arr, item) => {
    arr.push(() => item.actuator(onChange));
    return arr;
  }, [] as (() => Promise<void>)[]);

  await group(priceTasks);

  console.log(`更新楼幢完成`);

  const notificationList = await notice(values);
  console.log(`已成功发送邮件 ${notificationList.length} 封`);
};
