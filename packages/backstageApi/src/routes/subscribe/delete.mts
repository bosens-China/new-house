import { FastifyInstance } from 'fastify';
import { Type } from '@sinclair/typebox';
import { Mail } from '@new-house/database/model/mail';

export default (fastify: FastifyInstance) => {
  fastify.delete<{ Params: { id: string } }>(
    '/:id',
    {
      schema: {
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
      if (!(await Mail.findOne({ _id: id }))) {
        throw new Error(`待删除值不存在`);
      }
      await Mail.deleteOne({ _id: id });
      return '删除成功';
    },
  );
};
