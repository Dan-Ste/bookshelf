const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const router = new Router();
const goodreads = require('goodreads');
const cors = require('koa-cors');
const logger = require('koa-cors');
const mongoose = require('mongoose');
const config = require('./config/default');
const User = require('./app/models/user');

mongoose.connect('mongodb://localhost:27017/bookshelf');

app.use(cors());
app.use(logger());
app.use(bodyParser());

router.post('/token', async(ctx, next) => {
  ctx.body = ctx.request.body;

  if (ctx.body.grant_type === 'password') {
    if (ctx.body.username === 'letme' && ctx.body.password === 'in') {
      ctx.status = 200;
      ctx.body = JSON.stringify({
        "access_token": "secret token!",
        "account_id": 1
      });
      
    } else {
      ctx.status = 400;
      ctx.body = JSON.stringify({
        "error": "invalid_grant"
      })
    }
  }
})

router.get('/searchBooks', async(ctx, next) => {
  const term = ctx.query.term;

  console.log(`searching for book ${term}`);

  gr = goodreads.client({
    key: config.goodreads.key,
    secret: config.goodreads.secret
  });

  const promise = new Promise((resolve, reject) => {
    gr.searchBooks(term, json => {
      if (json) {
        resolve(json)
      }
    })
  })

  await promise.then((json) => {
    ctx.body = json;
  })

  await next();
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000, () => console.log('Server listening on', 3000))
