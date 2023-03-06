import { FastifyInstance } from 'fastify';
import { Static, Type } from '@sinclair/typebox';
import { Mail } from '@new-house/database/model/mail';
import { filterUndefinedValues } from '@new-house/public/object';

const SubscribePut = Type.Object({
  // 是否禁用
  disable: Type.Optional(Type.Boolean()),
  // 最高价格
  ceilingPrice: Type.Optional(Type.Number()),
  // 最低价格
  floorPrice: Type.Optional(Type.Number()),
});

type SubscribeTypePut = Static<typeof SubscribePut>;

export default (fastify: FastifyInstance) => {
  fastify.put<{ Body: SubscribeTypePut; Params: { id: string } }>(
    '/:id',
    {
      schema: {
        body: SubscribePut,
        response: {
          200: Type.String(),
        },
        params: Type.Object({
          id: Type.String(),
        }),
      },
    },
    async (request) => {
      const { id } = request.params;
      const { disable, ceilingPrice, floorPrice } = request.body;
      if (!(await Mail.findOne({ _id: id }))) {
        throw new Error(`待更新值不存在`);
      }
      await Mail.updateOne({ _id: id }, { $set: filterUndefinedValues({ disable, ceilingPrice, floorPrice }) });
      return '更新成功';
    },
  );
};
