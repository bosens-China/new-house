import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import * as dotenv from 'dotenv';
import users from './router/users';
import response from './middleware/response';
import mailbox from './router/mailbox';
import config from './router/config';
import initialization from './middleware/initialization';
import tasks from './middleware/tasks';

dotenv.config();

const main = async () => {
  const app = new Koa();
  app.use(response());
  app.use(await initialization());
  app.use(await tasks());
  app.use(bodyParser());
  app.use(users.routes()).use(users.allowedMethods());
  app.use(mailbox.routes()).use(mailbox.allowedMethods());
  app.use(config.routes()).use(config.allowedMethods());

  const port = +process.env.PORT;

  app.listen(port, () => {
    console.log(`程序运行在${port}端口`);
  });
};

main().catch((e) => {
  console.log(e instanceof Error ? e.message : e);
  process.exit(1);
});
