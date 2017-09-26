import Ember from 'ember';
import {
  task
} from 'ember-concurrency';

const {
  get,
  Controller,
  computed: {
    alias
  }
} = Ember;

export default Controller.extend({

  book: alias('model'),

  createUser: task(function* (newBook) {
    const records = yield this.store.findAll('user')
    const user = get(records, 'firstObject');

    get(user, 'books').addObject(newBook);

    newBook.save().then(() => user.save()).then(() => this.transitionTo('books'));

    this.transitionTo('books');
  })

});
