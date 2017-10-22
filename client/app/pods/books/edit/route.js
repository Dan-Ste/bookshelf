import Route from '@ember/routing/route'
import {
  get,
  set
} from '@ember/object'
import {
  hash
} from 'rsvp';

export default Route.extend({
  breadCrumb: {},

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
  },

  afterModel(model) {
    set(this, 'breadCrumb', {
      title: `Edit ${get(model, 'firstObject.title')}`
    })
  }
});
