async function crossDomain(ctx, next) {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  // ctx.set('Access-Control-Allow-Headers', 'Content-type, Content-Length, Authorization, Accept, X-Requesteed-With, x-token, sessionToken, token');

  ctx.method === 'OPTIONS' ? (ctx.body = 200) : await next();
}

module.exports = crossDomain;
