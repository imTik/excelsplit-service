const errorCode = require('../config/errorCode');
const FastTime = require('./FastTime');
const fastTime = new FastTime();

function resFactory(code, info = null) {
  code = code.toString();
  let msg = '';
  if (!errorCode[code]) {
    console.log('error log: ', code);
    msg = code;
    code = '-1';
  }
  let responseMsg = {
    code,
    message: msg || errorCode[code],
    result: info,
    responseTime: fastTime.getDate(),
  };
  return responseMsg;
}

module.exports = resFactory;
