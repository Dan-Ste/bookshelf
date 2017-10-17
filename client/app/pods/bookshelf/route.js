import {
  get
} from '@ember/object'
import Route from '@ember/routing/route';
import {
  hash
} from 'rsvp'

export default Route.extend({

  model({
    bookshelf_id
  }) {
    return hash({
      books: this.store.findRecord('bookshelf', bookshelf_id).then(bookshelf => {
        return get(bookshelf, 'books');
      })
    })
  }
});
