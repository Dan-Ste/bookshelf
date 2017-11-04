import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function () {
  this.route('login');

  this.authenticatedRoute('books', function () {
    this.authenticatedRoute('book', {
      path: '/:slug'
    }, function () {
      this.authenticatedRoute('edit', {
        path: '/edit'
      });
    });
    this.authenticatedRoute('new', {
      path: '/new'
    });
  });

  this.authenticatedRoute('authors', function () {
    this.authenticatedRoute('author', {
      path: '/:slug'
    }, function () {
      this.authenticatedRoute('edit', {
        path: '/edit'
      });
    });
    this.authenticatedRoute('new', {
      path: '/new'
    });
  });

  this.route('bookshelf', {
    path: 'bookshelf/:slug'
  });
});

export default Router;
