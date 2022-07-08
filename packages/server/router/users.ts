import Router from 'koa-router';
import validator, { Joi } from 'koa-context-validator';
import { DefaultState, Context } from 'koa';
import db, { Data } from '../database/users';
import { encryption, sign, verify } from './utils';

const users = new Router<DefaultState, Context>({ prefix: '/users' });

// 注册
users.post(
  '/register',
  validator({
    body: Joi.object().keys({
      userName: Joi.string().min(1).max(20).required(),
      password: Joi.string().min(1).max(20).required(),
    }),
  }),
  async (ctx) => {
    const body = ctx.request.body as Omit<Data, 'mailbox'>;
    await db.read();
    db.data ||= [];
    const result = db.data.find((f) => f.userName === body.userName);
    if (result) {
      ctx.error(`${body.userName}已存在！`);
      return;
    }
    const obj = {
      userName: body.userName,
      password: encryption(body.password),
    };
    const token = sign(obj);
    db.data.push(obj);
    await db.write();
    ctx.success(token);
  },
);

// 验证
users.post('/signIn', async (ctx) => {
  const { authorization = '' } = ctx.request.headers;
  const user = verify<Omit<Data, 'mailbox'>>(authorization);
  await db.read();
  db.data ||= [];
  const result = db.data.find((f) => f.userName === user.userName && user.password === f.password);
  if (result) {
    ctx.success('登录成功');
    return;
  }
  ctx.error('账号或者密码错误');
});

export default users;
