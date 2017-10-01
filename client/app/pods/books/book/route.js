import Ember from 'ember';

const {
  get,
  Route
} = Ember;

export default Route.extend({
  model({
    slug
  }) {
    return this.store.query('book', {
      orderBy: 'slug',
      equalTo: slug
    });
  }
});
