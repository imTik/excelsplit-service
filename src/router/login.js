const Router = require('koa-router');
const router = new Router();
const resFactory = require('../utils/resFactory');
const querySQL = require('../utils/querySQL');
const FastTime = require('../utils/FastTime');
const fastTime = new FastTime();

router.get('/', (ctx) => {
  ctx.body = resFactory('Hello World!');
});

// 注册接口
router.post('/register', async function (ctx, next) {
  try {
    const { phone, password, email, nickName } = ctx.params;

    if (!phone || !password || !email || !nickName) {
      throw '参数缺失';
    }

    const _querySQL = `SELECT * FROM user WHERE phone = "${phone}"`;
    const _queryResult = await querySQL(_querySQL);
    if (_queryResult.length > 0) {
      throw '-2';
    }

    const _insertSQL = `INSERT INTO user (phone, password, email, nick_name, created_time) VALUES ("${phone}", "${password}", "${email}", "${nickName}", "${fastTime.getDate()}")`;
    const _insertResult = await querySQL(_insertSQL);

    if (_insertResult.affectedRows === 0) {
      throw '-3';
    }

    let res = resFactory(200);
    res.result = {
      id: _insertResult.insertId,
    };
    ctx.body = res;
  } catch (e) {
    ctx.body = resFactory(e);
  }
});

router.post('/login', async function (ctx, next) {
  try {
    const { phone, password } = ctx.params;

    if (!phone) {
      throw '请输入手机号码';
    }
    if (!password) {
      throw '请输入密码';
    }

    const _querySQL = `SELECT * FROM user WHERE phone = ${phone}`;
    const userInfo = await querySQL(_querySQL);
    if (userInfo.length === 0) {
      throw '-4';
    }
    if (userInfo.password !== password) {
      throw '-5';
    }
    ctx.body = resFactory('登录成功');
  } catch (e) {
    ctx.body = resFactory(e);
  }
});

module.exports = router.routes();
