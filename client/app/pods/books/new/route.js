import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({
  breadCrumb: {
    title: 'New Book'
  },

  model() {
    return hash({
      book: this.store.createRecord('book'),
      authors: this.store.findAll('author'),
      bookshelves: this.store.findAll('bookshelf'),
    })
  }
});
