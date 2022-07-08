import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import users from './router/users';
import response from './middleware/response';
import mailbox from './router/mailbox';

const app = new Koa();
app.use(response());
app.use(bodyParser());
app.use(users.routes()).use(users.allowedMethods());
app.use(mailbox.routes()).use(mailbox.allowedMethods());

const port = +process.env.port;

app.listen(port, () => {
  console.log(`程序运行在${port}端口`);
});
