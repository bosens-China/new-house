import { FastifyInstance } from 'fastify';
import { Static, Type } from '@sinclair/typebox';
import { Mail, Data } from '@new-house/database/model/mail';
import { FilterQuery } from 'mongoose';

const Subscribe = Type.Object({
  current: Type.Optional(Type.Number()),
  pageSize: Type.Optional(Type.Number()),
  mailbox: Type.Optional(Type.String()),
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
      const { current = 1, pageSize = 20, mailbox } = request.query;
      const skip = (current - 1) * pageSize;
      const condition: FilterQuery<Data> = {};
      if (mailbox) {
        condition.mailbox = { $regex: new RegExp(mailbox) };
      }

      const length = (await Mail.find(condition).lean()).length;
      const result = await Mail.find(condition).sort({ createdDate: 1 }).skip(skip).limit(pageSize).lean();
      return { total: length, list: result };
    },
  );
};
