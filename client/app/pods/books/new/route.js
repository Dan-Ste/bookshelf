import Ember from 'ember';

const {
  Route,
  RSVP: {
    hash
  }
} = Ember;

export default Route.extend({
  model() {
    return hash({
      book: this.store.createRecord('book'),
      author: this.store.createRecord('author')
    })
  }
});
