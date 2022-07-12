import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import * as dotenv from 'dotenv';
import users from './router/users';
import response from './middleware/response';
import mailbox from './router/mailbox';
import config from './router/config';
import initialization from './middleware/initialization';

dotenv.config();

const app = new Koa();
app.use(response());
app.use(initialization());
app.use(bodyParser());
app.use(users.routes()).use(users.allowedMethods());
app.use(mailbox.routes()).use(mailbox.allowedMethods());
app.use(config.routes()).use(config.allowedMethods());

const port = +process.env.PORT;

app.listen(port, () => {
  console.log(`程序运行在${port}端口`);
});
