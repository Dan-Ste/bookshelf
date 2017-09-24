import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function () {
  this.route('books');
  this.route('book', {
    path: '/books/:book_id'
  });
  this.route('new', {
    path: '/books/new'
  });
  this.route('edit', {
    path: '/books/:book_id/edit'
  });
});

export default Router;
