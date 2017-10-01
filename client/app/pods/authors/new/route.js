import Ember from 'ember';

const {
  Route
} = Ember;

export default Route.extend({
  breadCrumb: {
    title: 'New Author'
  },

  model() {
    return this.store.createRecord('author');
  }
});
