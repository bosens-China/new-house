import template from './template/index.mjs';
import nodemailer from 'nodemailer';
import { Data } from '@new-house/database/model/list';
import { load } from 'cheerio';
import { Mail } from '@new-house/database/model/mail';

export default async (data: Array<Data>) => {
  if (!data.length) {
    return;
  }
  const html = template(data);
  const { EMAIL_ACCOUNT, EMAIL_AUTHORIZATION_CODE } = process.env;

  const transporter = nodemailer.createTransport({
    service: 'QQ',
    host: 'smtp.qq.email',
    auth: {
      user: EMAIL_ACCOUNT,
      pass: EMAIL_AUTHORIZATION_CODE,
    },
  });
  const $ = load(html, null, false);
  const text = $.text();
  const mailbox = await Mail.find({}).lean();
  const to = mailbox
    .filter((f) => f.disable !== true)
    .map((f) => f.mailbox)
    .join(',');
  await transporter.sendMail({
    from: `"楼盘小助手 👻" <${EMAIL_ACCOUNT}>`,
    to,
    subject: '楼盘列表上新',
    text,
    html,
  });
  console.log(`已成功发送邮件`);
};
