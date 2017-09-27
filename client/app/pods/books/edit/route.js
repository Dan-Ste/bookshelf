import Ember from 'ember';

const {
  Route
} = Ember;

export default Route.extend({
  model({
    book_id
  }) {
    return this.store.findRecord('book', book_id)
  }
});
