import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function () {
  this.authenticatedRoute('books', function () {
    this.authenticatedRoute('new', {
      path: '/new'
    });
    this.authenticatedRoute('book', {
      path: '/:book_id'
    });
    this.authenticatedRoute('edit', {
      path: '/:book_id/edit'
    });
  });

  this.authenticatedRoute('authors');

  this.route('login');
});

export default Router;
