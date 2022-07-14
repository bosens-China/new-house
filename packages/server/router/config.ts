import Router from 'koa-router';
import { DefaultState, Context } from 'koa';
import validator, { Joi } from 'koa-context-validator';
import _ from 'lodash';
import { verify } from './utils';
import db from '../model/config';
import { DEFAULT_VALUE } from '../constant/config';

const mailbox = new Router<DefaultState, Context>({ prefix: '/config' });

// 列表
mailbox.get('/crontab', async (ctx) => {
  const { authorization = '' } = ctx.request.headers;
  const user = await verify(authorization);
  if (!user.root) {
    return ctx.error(`无权限查看`);
  }
  const result = (await db.findOne({})) || DEFAULT_VALUE;
  return ctx.success(result?.crontab);
});

mailbox.get('/template', async (ctx) => {
  const { authorization = '' } = ctx.request.headers;
  const user = await verify(authorization);
  if (!user.root) {
    return ctx.error(`无权限查看`);
  }
  const result = (await db.findOne({})) || DEFAULT_VALUE;
  return ctx.success(_.pick(result, ['html', 'style'] || {}));
});

mailbox.put(
  '/crontab',
  validator({
    body: Joi.object({
      crontab: Joi.string().required(),
    }).options({ stripUnknown: true }),
  }),
  async (ctx) => {
    const { authorization = '' } = ctx.request.headers;
    const user = await verify(authorization);
    if (!user.root) {
      return ctx.error(`无权限查看`);
    }
    const body = ctx.request.body as { crontab: string };

    await db.updateOne(
      {},
      {
        $set: { crontab: body.crontab },
      },
    );

    return ctx.success(`更新成功`);
  },
);
mailbox.put(
  '/template',
  validator({
    body: Joi.object({
      html: Joi.string().required(),
      style: Joi.string(),
    }).options({ stripUnknown: true }),
  }),
  async (ctx) => {
    const { authorization = '' } = ctx.request.headers;
    const user = await verify(authorization);
    if (!user.root) {
      return ctx.error(`无权限查看`);
    }
    const body = ctx.request.body as { html: string; style?: string };

    await db.updateOne(
      {},
      {
        $set: { html: body.html, style: body.style },
      },
    );

    return ctx.success(`更新成功`);
  },
);

export default mailbox;
