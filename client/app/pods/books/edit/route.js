import Route from '@ember/routing/route';

export default Route.extend({
  model({
    book_id
  }) {
    return this.store.findRecord('book', book_id)
  }
});
