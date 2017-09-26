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

  book: alias('model.book'),
  author: alias('model.author'),

  createUser: task(function* (newBook, author) {
    const records = yield this.store.findAll('user')
    const user = get(records, 'firstObject');

    get(user, 'books').addObject(newBook);
    get(author, 'books').addObject(newBook);

    yield newBook.save();
    yield author.save();
    yield user.save();

    this.transitionToRoute('books');
  })

});
