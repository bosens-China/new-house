import { List, Data } from '@new-house/database/model/list';

/*
 * 获取正在登记和暂未开始的list数据
 */
export const getList = async () => {
  const current = new Date().valueOf();
  const all = await List.find({ endTime: { $gt: current } }).lean();
  return all.map((f) => {
    return {
      ...f,
      state: (f.startTime >= current ? '正在登记' : '暂未开始') as Data['state'],
    };
  });
};
