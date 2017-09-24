import Ember from 'ember';

const {
  Route,
  inject: {
    service
  }
} = Ember;

export default Route.extend({
  session: service(),

  model() {
    const newBook = this.store.createRecord('book', {
      title: 'My book',
      description: 'Some description',
      pubYear: '2017'
    });

    newBook.save();
    this.transitionTo('books');
  }
});
