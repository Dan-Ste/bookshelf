import Controller from '@ember/controller';
import {
  get
} from '@ember/object';
import {
  alias
} from '@ember/object/computed';
import {
  inject as service
} from '@ember/service'

export default Controller.extend({
  books: service(),

  book: alias('model.book'),
  bookshelves: alias('model.bookshelves'),
  authors: alias('model.authors'),

  cancelEditing(book) {
    this.transitionToRoute('books.book', get(book, 'slug'))
  }
});
