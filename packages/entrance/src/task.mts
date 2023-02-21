import { list, details, building } from '@new-house/reptiles';
import notice from '@new-house/notice';
import { group } from '@new-house/speed-limit';
import ProgressBar from 'progress';

export const task = async () => {
  const diff = await list();
  const values = diff.filter((f) => f && f.state !== '登记结束');
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
  const priceBar = new ProgressBar('爬取楼幢价格 [:bar] :current/:total :percent :rate :elapseds 预计完成时间：:etas', {
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
