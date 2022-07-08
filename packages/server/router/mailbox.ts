import Router from 'koa-router';
import { DefaultState, Context } from 'koa';
import db, { Data } from '../database/users';
import { verify } from './utils';

const mailbox = new Router<DefaultState, Context>({ prefix: '/mailbox' });

// 列表
mailbox.get('/', async (ctx) => {
  const { authorization = '' } = ctx.request.headers;
  const user = verify<Data>(authorization);
  await db.read();
  db.data ||= [];
  const result = db.data.find((f) => f.userName === user.userName && user.password === f.password);
  if (!result) {
    return ctx.success([]);
  }
  return ctx.success(user.mailbox || []);
});

export default mailbox;
