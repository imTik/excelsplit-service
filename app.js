const Koa = require('koa');
const app = new Koa();
const BodyParser = require('koa-bodyparser');
const bodyParser = BodyParser();

const crossDomain = require('./src/config/crossDomain');
const requestBody = require('./src/utils/requestBody');
const loginRoutes = require('./src/router/login');

app.use(bodyParser);
app.use(crossDomain);
app.use(requestBody);
app.use(loginRoutes);

app.listen(3000, () => {
  console.log('服务已启动');
});
