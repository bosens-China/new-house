import { FastifyPluginCallback } from 'fastify';
import deleteApi from './delete.mjs';
import postApi from './post.mjs';
import putApi from './put.mjs';
import getApi from './get.mjs';
import repeatApi from './repeat.mjs';

const fn: FastifyPluginCallback = (fastify, opts, done) => {
  [deleteApi, postApi, putApi, getApi, repeatApi].forEach((fn) => fn(fastify));
  done();
};

export default fn;
