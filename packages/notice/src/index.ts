import template from './template/index.js';
import nodemailer from 'nodemailer';
import { Data } from '@new-house/database/model/list';
import { load } from 'cheerio';

export default async (data: Array<Data>) => {
  if (!data.length) {
    return;
  }
  const html = template(data);
  const { EMAIL_ACCOUNT, EMAIL_AUTHORIZATION_CODE } = process.env;
  const transporter = nodemailer.createTransport({
    service: 'QQ',
    auth: {
      user: EMAIL_ACCOUNT,
      pass: EMAIL_AUTHORIZATION_CODE,
    },
  });
  const $ = load(html, null, false);
  const text = $.text();

  await transporter.sendMail({
    from: '"楼盘小助手 👻" <1040447117@qq.com>',
    to: 'bar@example.com, baz@example.com',
    subject: '楼盘列表上新',
    text,
    html,
  });
};
