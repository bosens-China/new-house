import { FastifyInstance } from 'fastify';
import { Static, Type } from '@sinclair/typebox';
import { Mail } from '@new-house/database/model/mail';

const SubscribePost = Type.Object({
  mailbox: Type.String(),
  // 是否禁用
  disable: Type.Boolean(),
  // 最高价格
  ceilingPrice: Type.Optional(Type.Number()),
  // 最低价格
  floorPrice: Type.Optional(Type.Number()),
});
type SubscribeTypePost = Static<typeof SubscribePost>;

export default (fastify: FastifyInstance) => {
  fastify.post<{ Body: SubscribeTypePost }>(
    '/',
    {
      schema: {
        body: SubscribePost,
        response: {
          200: Type.String(),
        },
      },
    },
    async (request) => {
      const { mailbox, ...rest } = request.body;
      if (await Mail.findOne({ mailbox })) {
        throw new Error(`${mailbox} 已经存在！`);
      }
      await Mail.insertMany([
        {
          ...rest,
          mailbox,
          createdDate: new Date().valueOf(),
        },
      ]);
      return '创建成功';
    },
  );
};
