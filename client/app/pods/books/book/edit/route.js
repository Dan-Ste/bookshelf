import Route from '@ember/routing/route'
import {
  hash
} from 'rsvp'
import {
  get
} from '@ember/object';

export default Route.extend({
  model() {
    return hash({
      book: this.modelFor('books.book'),
      authors: this.store.findAll('author'),
      bookshelves: this.store.findAll('bookshelf')
    })
  },

  actions: {
    willTransition() {
      const book = get(this, 'controller.book')

      if (get(book, 'hasDirtyAttributes')) {
        book.rollbackAttributes()
      }
    }
  }
});
