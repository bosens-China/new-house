import Router from 'koa-router';
import { DefaultState, Context } from 'koa';
import validator, { Joi } from 'koa-context-validator';

import { verify } from './utils';
import db from '../model/mailbox';

const mailbox = new Router<DefaultState, Context>({ prefix: '/mailbox' });

interface Query {
  mailbox?: string;
  region?: string;
}

// 列表
mailbox.get(
  '/',
  validator({
    query: Joi.object({
      mailbox: Joi.string().empty(''),
      region: Joi.string(),
    }).options({ stripUnknown: true }),
  }),
  async (ctx) => {
    const { authorization = '' } = ctx.request.headers;
    const { mailbox: mailboxQuery = '', region = '' } = ctx.query as Query;
    const user = await verify(authorization);
    // const { mailbox: mailboxList = [] } = user;
    const arr = await db
      .find({
        parentId: user._id,
        mailbox: { $regex: mailboxQuery },
        // 如果传递为空或者all返回所有区域，否则返回指定区域
        ...(!region || region === 'all' ? {} : { region }),
      })
      .sort({ _id: -1 });
    return ctx.success(arr);
  },
);
interface PostBody {
  mailbox: string;
  region: Array<string>;
}
mailbox.post(
  '/',
  validator({
    body: Joi.object({
      mailbox: Joi.string().email().required(),
      region: Joi.array().items(Joi.string().required()).required(),
    }).options({ stripUnknown: true }),
  }),
  async (ctx) => {
    const { authorization = '' } = ctx.request.headers;
    const user = await verify(authorization);
    const body = ctx.request.body as PostBody;
    const result = await db.findOne({ parentId: user._id, mailbox: body.mailbox });
    if (result) {
      return ctx.error(`${body.mailbox}已经存在`);
    }
    await db.insertMany([
      {
        parentId: user._id,
        mailbox: body.mailbox,
        region: body.region,
      },
    ]);

    return ctx.success(`添加成功`);
  },
);
mailbox.put(
  '/:id',
  validator({
    body: Joi.object({
      mailbox: Joi.string().email().required(),
      region: Joi.array().items(Joi.string().required()).required(),
    }).options({ stripUnknown: true }),
    params: Joi.object({
      id: Joi.string().required(),
    }),
  }),
  async (ctx) => {
    const { id } = ctx.params;
    const { authorization = '' } = ctx.request.headers;
    const body = ctx.request.body as PostBody;
    const user = await verify(authorization);
    const result = await db.findOne({
      parentId: user._id,
      _id: id,
    });
    if (!result) {
      return ctx.error(`当前数据不存在，无需更新`);
    }
    await db.updateOne(
      {
        parentId: user._id,
        _id: id,
      },
      {
        $set: { mailbox: body.mailbox, region: body.region },
      },
    );

    return ctx.success(`更新成功`);
  },
);

mailbox.delete(
  '/:id',
  validator({
    params: Joi.object({
      id: Joi.string().required(),
    }),
  }),
  async (ctx) => {
    const { id } = ctx.params;
    const { authorization = '' } = ctx.request.headers;
    const user = await verify(authorization);
    const result = await db.findOne({
      parentId: user._id,
      _id: id,
    });
    if (!result) {
      return ctx.error(`当前数据不存在`);
    }
    await db.deleteOne({
      parentId: user._id,
      _id: id,
    });
    return ctx.success(`删除成功`);
  },
);
export default mailbox;
