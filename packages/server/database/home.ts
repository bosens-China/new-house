import { Low, JSONFile } from 'lowdb';
import path from 'path';

export interface Data {
  name: string;
  url: string;
  region: string;
  startTime: number;
  endTime: number;
  total: number;
  // 企业名称
  enterpriseName: string;
  // 楼栋
  building: Array<string>;
  state: '正在登记' | '暂未开始' | '登记结束';
}
/*
 * 注意，名字不要和当前文件重名，否则会优先引用json文件
 */

const file = path.join(__dirname, './homeData.json');

const adapter = new JSONFile<Array<Data>>(file);

const db = new Low(adapter);

export default db;
