const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body')();
const app = new Koa();
const router = new Router();
const goodreads = require('goodreads');
const config = require('./config/default');

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

app.listen(3000);

console.log('listening on port 3000');
