const Router = require('koa-router');
const router = new Router();
const resFactory = require('../utils/resFactory');
const querySQL = require('../utils/querySQL');
const FastTime = require('../utils/FastTime');
const fastTime = new FastTime();

router.get('/', (ctx) => {
  ctx.body = resFactory('Hello World');
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

module.exports = router.routes();
