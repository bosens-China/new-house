/* eslint-disable no-console */
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import users from './router/users';
import response from './middleware/response';
import mailbox from './router/mailbox';

dotenv.config();

mongoose
  .connect(
    `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:${process.env.MONGO_INITDB_ROOT_PORT}/house?authSource=admin`,
  )
  .catch(() => {
    console.log(`连接数据库出现问题`);
  });
const app = new Koa();
app.use(response());
app.use(bodyParser());
app.use(users.routes()).use(users.allowedMethods());
app.use(mailbox.routes()).use(mailbox.allowedMethods());

const port = +process.env.PORT;

app.listen(port, () => {
  console.log(`程序运行在${port}端口`);
});
