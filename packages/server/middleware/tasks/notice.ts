import nodemailer from 'nodemailer';
import _ from 'lodash';
import dayjs from 'dayjs';
import db, { Data } from '../../model/reptile';
import dbMailbox from '../../model/mailbox';
import dbConfig from '../../model/config';
import { DEFAULT_VALUE } from '../../constant/config';

dayjs.locale('zh-cn');

const getData = (data: Data) => {
  const { startTime, endTime } = data;
  return {
    ...data,
    startTimeStr: dayjs(startTime).format('YYYY-MM-DD HH:mm:ss'),
    // 结束时间
    endTimeStr: dayjs(endTime).format('YYYY-MM-DD HH:mm:ss'),
  };
};

export default async (data: Array<Data>) => {
  if (!data.length) {
    return;
  }

  const { EMAIL_AUTHORIZATION_CODE, MAILBOX } = process.env;
  const transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 587,
    secure: false,
    auth: {
      user: MAILBOX,
      pass: EMAIL_AUTHORIZATION_CODE,
    },
  });
  const all = await db.find({
    state: { $regex: /正在登记|暂未开始/ },
  });

  const result = (await dbMailbox.find({})) || [];

  const { html = DEFAULT_VALUE.html, style = DEFAULT_VALUE.style } = (await dbConfig.findOne({})) || {};

  for (const { region, mailbox } of result) {
    const newData = data.filter((f) => region.includes(f.region));
    const compiled = _.template(`${html}\n<style>${style}</style>`);
    const code = compiled({ newData: newData.map((f) => getData(f)), data: all.map((f) => getData(f)) });
    transporter
      .sendMail({
        from: MAILBOX,
        to: mailbox,
        subject: '新增楼盘提醒',
        html: code,
      })
      .catch((e: any) => {
        console.log(`发送邮件失败\n${e}`);
      });
  }
};
