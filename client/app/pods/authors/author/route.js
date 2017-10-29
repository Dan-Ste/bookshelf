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
    return this.store.query('author', {
      orderBy: 'slug',
      equalTo: slug
    }).then(author => get(author, 'firstObject'))
  },

  afterModel(model) {
    set(this, 'breadCrumb', {
      title: get(model, 'fullName')
    })
  }
});
