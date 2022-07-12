import Router from 'koa-router';
import validator, { Joi } from 'koa-context-validator';
import { DefaultState, Context } from 'koa';
import db, { Data } from '../model/users';
import { encryption, sign } from './utils';

const users = new Router<DefaultState, Context>({ prefix: '/users' });

// 注册
users.post(
  '/register',
  validator({
    body: Joi.object({
      userName: Joi.string().min(1).max(20).required(),
      password: Joi.string().min(1).max(20).required(),
    }).options({ stripUnknown: true }),
  }),
  async (ctx) => {
    const body = ctx.request.body as Data;
    const result = await db.findOne({ userName: body.userName });
    if (result) {
      ctx.error(`${body.userName}已存在！`);
      return;
    }
    const obj = {
      userName: body.userName,
      password: encryption(body.password),
      root: body.root,
    };

    await db.insertMany([obj]);
    ctx.success(`注册成功`);
  },
);

// 验证
users.post(
  '/signIn',
  validator({
    body: Joi.object({
      userName: Joi.string().min(1).max(20).required(),
      password: Joi.string().min(1).max(20).required(),
    }).options({ stripUnknown: true }),
  }),
  async (ctx) => {
    const body = ctx.request.body as Data;
    const findObj = {
      userName: body.userName,
      password: encryption(body.password),
    };
    const result = await db.findOne(findObj);

    if (!result) {
      ctx.error('账号或者密码错误');
      return;
    }

    const token = sign(findObj);
    ctx.success({ token, root: !!result.root });
  },
);

export default users;
