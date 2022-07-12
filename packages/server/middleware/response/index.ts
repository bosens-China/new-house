import { Context, Next } from 'koa';

export default () => async (ctx: Context, next: Next) => {
  ctx.success = <T>(body: T) => {
    ctx.type = 'json';
    ctx.body = {
      code: 200,
      data: body,
      message: 'ok',
    };
  };
  ctx.error = (err: Error | string, code = 400) => {
    ctx.body = {
      code,
      data: null,
      message: (err instanceof Error ? err.message : err) || 'error',
    };
  };

  try {
    await next();
  } catch (e: any) {
    // 如果token过期的话
    if (e.OVERDUE) {
      return ctx.error(e, 403);
    }
    return ctx.error(e);
  }
};
