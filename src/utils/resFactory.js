const errorCode = require('../config/errorCode');

function resFactory(code, info) {
  code = code.toString();
  let msg = '';
  if (!errorCode[code]) {
    console.log('error log: ', code);
    msg = code;
    code = '-1';
  }
  let responseMsg = {
    code,
    message: info || errorCode[code],
  };
  return responseMsg;
}

module.exports = resFactory;
