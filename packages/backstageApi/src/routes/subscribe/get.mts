import { FastifyInstance } from 'fastify';
import { Static, Type } from '@sinclair/typebox';
import { Mail } from '@new-house/database/model/mail';

const Subscribe = Type.Object({
  current: Type.Optional(Type.Number()),
  pageSize: Type.Optional(Type.Number()),
});

type SubscribeTypePut = Static<typeof Subscribe>;

const returnValue = Type.Object({
  total: Type.Number(),
  list: Type.Array(Type.Any()),
});

type returnValueType = Static<typeof returnValue>;

export default (fastify: FastifyInstance) => {
  fastify.get<{ Querystring: SubscribeTypePut }>(
    '/',
    {
      schema: {
        response: {
          200: Type.Object({
            total: Type.Number(),
            list: Type.Array(Type.Any()),
          }),
        },
        querystring: Subscribe,
      },
    },
    async (request): Promise<returnValueType> => {
      const { current = 1, pageSize = 20 } = request.query;
      const skip = (current - 1) * pageSize;
      const length = (await Mail.find({}).lean()).length;
      const result = await Mail.find({}).sort({ createdDate: 1 }).skip(skip).limit(pageSize).lean();
      return { total: length, list: result };
    },
  );
};
