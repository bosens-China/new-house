import { FastifyInstance } from 'fastify';
import { Static, Type } from '@sinclair/typebox';
import notice from '@new-house/notice';

const Query = Type.Object({
  mailbox: Type.Optional(Type.String()),
});

type QueryType = Static<typeof Query>;

export default (fastify: FastifyInstance) => {
  fastify.get<{ Querystring: QueryType }>(
    '/repeat',
    {
      schema: {
        response: {
          200: Type.String(),
        },
        querystring: Query,
      },
    },
    async (request): Promise<string> => {
      const { mailbox } = request.query;

      try {
        await notice([], mailbox);
        return '重发邮件成功';
      } catch {
        return '重发邮件失败';
      }
    },
  );
};
