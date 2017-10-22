import Controller from '@ember/controller'
import {
  alias
} from '@ember/object/computed'
import {
  inject as service
} from '@ember/service'

export default Controller.extend({
  firebaseUtil: service(),
  books: service(),

  newBook: alias('model.book'),
  authors: alias('model.authors'),
  bookshelves: alias('model.bookshelves')
})
