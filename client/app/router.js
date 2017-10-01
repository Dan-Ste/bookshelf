import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function () {
  this.route('login');

  this.authenticatedRoute('books', function () {
    this.authenticatedRoute('new', {
      path: '/new'
    });
    this.authenticatedRoute('book', {
      path: '/:slug'
    });
    this.authenticatedRoute('edit', {
      path: '/:slug/edit'
    });
  });

  this.authenticatedRoute('authors', function () {
    this.authenticatedRoute('author', {
      path: '/:slug'
    });
    this.authenticatedRoute('new', {
      path: '/new'
    });
  });
});

export default Router;
