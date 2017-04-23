import Ember from 'ember';
import {
  task,
  timeout
} from 'ember-concurrency';

const {
  get,
  Controller,
  inject: {
    service
  }
} = Ember;

const DEBOUNCE_MS = 250;

export default Controller.extend({
  ajax: service(),

  searchBooks: task(function*(term) {
    yield timeout(DEBOUNCE_MS);

    if (term) {
      return yield get(this, 'ajax').request('/searchBooks', {
        method: 'GET',
        data: {
          term
        }
      });
    }
  }).restartable()
});
