import Route from '@ember/routing/route'
import {
  hash
} from 'rsvp'

export default Route.extend({
  model() {
    return hash({
      book: this.modelFor('books.book'),
      authors: this.store.findAll('author'),
      bookshelves: this.store.findAll('bookshelf')
    })
  }
});
