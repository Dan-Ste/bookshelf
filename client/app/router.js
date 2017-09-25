import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function () {
  this.authenticatedRoute('books', function () {
    this.route('new', {
      path: '/new'
    });
  });
  this.authenticatedRoute('book', {
    path: '/book/:book_id'
  });

  this.authenticatedRoute('edit', {
    path: '/book/:book_id/edit'
  });
  this.route('login');
});

export default Router;
