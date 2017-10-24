import Route from '@ember/routing/route'
import {
  hash
} from 'rsvp';

export default Route.extend({

  model({
    slug
  }) {
    return hash({
      book: this.store.query('book', {
        orderBy: 'slug',
        equalTo: slug
      }),
      authors: this.store.findAll('author'),
      bookshelves: this.store.findAll('bookshelf'),
    })
  }
});
