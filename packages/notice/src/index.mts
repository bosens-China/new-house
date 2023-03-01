/// <reference path="../../../global.d.ts" />

import { getData, getTemplate, priceFiltering } from './template/index.mjs';
import nodemailer from 'nodemailer';
import { RootData } from '@new-house/database/model/list';
import { load } from 'cheerio';
import { Mail } from '@new-house/database/model/mail';
import { getList } from './utils.mjs';

export default async (data: Array<RootData>) => {
  const result: Array<string> = [];
  /*
   * 获取模板需要的数据
   */
  const newData = await getData(data);
  const all = await getList();
  const allData = await getData(all);

  const { EMAIL_ACCOUNT, EMAIL_AUTHORIZATION_CODE } = process.env;

  const transporter = nodemailer.createTransport({
    service: 'QQ',
    host: 'smtp.qq.email',
    auth: {
      user: EMAIL_ACCOUNT,
      pass: EMAIL_AUTHORIZATION_CODE,
    },
  });
  // 这里因为邮箱的设置条件不同，所有循环发送
  const mailLists = await Mail.find({}).lean();
  for (const { disable, floorPrice, ceilingPrice, mailbox } of mailLists) {
    if (disable) {
      continue;
    }
    // 价格对比
    const filterNewData = priceFiltering(newData, { floorPrice, ceilingPrice });
    const filterAllData = priceFiltering(allData, { floorPrice, ceilingPrice });
    if (!filterNewData.length && !filterAllData.length) {
      continue;
    }

    const html = getTemplate(filterNewData, filterAllData);
    const $ = load(html, null, false);
    const text = $.text();
    await transporter.sendMail({
      from: `"楼盘小助手 👻" <${EMAIL_ACCOUNT}>`,
      to: mailbox,
      subject: '楼盘列表上新',
      text,
      html,
    });
    result.push(mailbox);
  }
  return result;
};
