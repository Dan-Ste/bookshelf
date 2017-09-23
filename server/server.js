const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const apiRoute = express.Router();
const goodreads = require('goodreads');
const mongoose = require('mongoose');
const config = require('./config/default');
const User = require('./models/user');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(config.mongoose.uri);

// router.post('/token', async(ctx, next) => {
//   ctx.body = ctx.request.body;
//
//   if (ctx.body.grant_type === 'password') {
//     if (ctx.body.username === 'letme' && ctx.body.password === 'in') {
//       ctx.status = 200;
//       ctx.body = JSON.stringify({
//         "access_token": "secret token!",
//         "account_id": 1
//       });
//
//     } else {
//       ctx.status = 400;
//       ctx.body = JSON.stringify({
//         "error": "invalid_grant"
//       })
//     }
//   }
// })
//
// router.post('/revoke', function(req, res) {
//   ctx.body = ctx.request.body;
//
//   if (ctx.body.token_type_hint === 'access_token' || ctx.body.token_type_hint === 'refresh_token') {
//     ctx.status = 200;
//   } else {
//     ctx.status = 400;
//     ctx.body = JSON.stringify({
//       "error": "unsupported_token_type"
//     });
//   }
// });
//
// router.get('/searchBooks', async(ctx, next) => {
//   const term = ctx.query.term;
//
//   console.log(`searching for book ${term}`);
//
//   gr = goodreads.client({
//     key: config.goodreads.key,
//     secret: config.goodreads.secret
//   });
//
//   const promise = new Promise((resolve, reject) => {
//     gr.searchBooks(term, json => {
//       if (json) {
//         resolve(json)
//       }
//     })
//   })
//
//   await promise.then((json) => {
//     ctx.body = JSON.stringify(json.GoodreadsResponse.search[0].results[0].work.map((work) => {
//       return {
//         title: work.best_book[0].title[0],
//         image: work.best_book[0].image_url[0],
//         author: work.best_book[0].author[0].name[0]
//       };
//     }));
//   })
//
//   await next();
// });
//


/**
 * Error handlers
 */

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(config.port, () => console.log('Server listening on', config.port))
