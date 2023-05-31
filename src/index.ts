import Koa from 'koa';
import Logger from 'koa-logger';
import Router from 'koa-router';
import { getCalendar, updateCalendar } from './calendars.js';
import { config } from './config.js';
import http from 'http';

const app = new Koa();

app.use(Logger());

app.use(async (ctx, next) => {
  ctx.set('X-Powered-By', 'releasical');
  await next();
});

// Validate we actually want to respond to this request
app.use(async (ctx, next) => {
  if (config.secret && config.secret !== ctx.request.query.secret) {
    ctx.status = 401;
    ctx.body = 'Unauthorized';
    return;
  }
  await next();
});

const router = new Router({ prefix: config.routePrefix });

router.get(':owner/:repo', async (ctx) => {
  const { owner, repo } = ctx.params;

  try {
    await updateCalendar(owner, repo);
    const calendar = getCalendar(owner, repo);

    ctx.set('Content-Type', 'text/calendar; charset=utf-8');
    ctx.set(
      'Content-Disposition',
      `attachment; filename="releases-${owner}-${repo}.ics"`,
    );

    ctx.body = calendar.toString();
    ctx.status = 200;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error };
  }
});

app.use(router.routes()).use(router.allowedMethods());

// Create the HTTP server

const server = http.createServer(app.callback());

server.on('error', (error) => console.error(error));

server.listen(config.port, () => {
  console.log(`Now listening on port ${config.port}`);
});
