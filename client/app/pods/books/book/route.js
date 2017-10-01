import Ember from 'ember';

const {
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
