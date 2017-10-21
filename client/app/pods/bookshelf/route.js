import {
  get,
  set
} from '@ember/object'
import Route from '@ember/routing/route';
import {
  hash
} from 'rsvp'

export default Route.extend({
  breadCrumb: {},

  model({
    bookshelf_id
  }) {
    return hash({
      bookshelf: this.store.findRecord('bookshelf', bookshelf_id)
    })
  },

  afterModel(model) {
    const bookshelfTitle = get(model, 'bookshelf.title');

    set(this, 'breadCrumb', {
      title: bookshelfTitle
    });
  },
});
