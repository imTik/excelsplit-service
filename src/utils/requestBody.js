async function requestBody(ctx, next) {
  ctx.params = {
    ...ctx.query,
    ...ctx.request.body,
  };
  await next();
}

module.exports = requestBody;
