import {
  get,
  set
} from '@ember/object'
import Route from '@ember/routing/route'
import {
  hash
} from 'rsvp'

export default Route.extend({
  breadCrumb: {},

  model({
    slug
  }) {
    return hash({
      bookshelf: this.store.query('bookshelf', {
        orderBy: 'slug',
        equalTo: slug
      }).then(bookshelf => get(bookshelf, 'firstObject'))
    })
  },

  afterModel(model) {
    set(this, 'breadCrumb', {
      title: get(model, 'bookshelf.title')
    })
  }
})
