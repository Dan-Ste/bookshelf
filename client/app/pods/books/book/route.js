import Route from '@ember/routing/route'
import {
  get,
  set
} from '@ember/object'

export default Route.extend({
  breadCrumb: {},

  model({
    slug
  }) {
    return this.store.query('book', {
      orderBy: 'slug',
      equalTo: slug
    }).then(book => get(book, 'firstObject'))
  },

  afterModel(model) {
    set(this, 'breadCrumb', {
      title: get(model, 'title')
    })
  }
});
