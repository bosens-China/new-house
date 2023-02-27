/// <reference path="../../entrance/environment.d.ts" />

import fastify from 'fastify';
import { init } from '@new-house/database/init';
import subscribe from './routes/subscribe/index.mjs';
import _ from 'lodash-es';
import { Normal } from './type.mjs';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

const app = fastify({
  logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();

app.register(subscribe, { prefix: '/api/subscribe' });

/*
 * 这里必须返回字符串类型
 */
app.addHook('onSend', async function (request, reply, payload: any) {
  if (!_.isString(payload)) {
    return;
  }
  // 改变状态
  reply.code(200);
  try {
    const value = JSON.parse(payload);
    if (_.isObjectLike(value) && value.statusCode && value.error) {
      return payload;
    }
    const newPayload: Normal = {
      data: value,
      statusCode: 200,
      message: 'ok',
    };
    return JSON.stringify(newPayload);
  } catch {
    const newPayload: Normal = {
      data: payload,
      statusCode: 200,
      message: 'ok',
    };
    return JSON.stringify(newPayload);
  }
});

try {
  await init();
  await app.listen({ port: +process.env.PORT, host: '0.0.0.0' });
} catch (err) {
  console.log(err);
  process.exit(1);
}
