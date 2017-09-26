import Ember from 'ember';

const {
  Route
} = Ember;

export default Route.extend({
  model() {
    return this.store.createRecord('book', {
      title: 'My book',
      description: 'Some description',
      pubYear: '2017'
    });
  }
});
