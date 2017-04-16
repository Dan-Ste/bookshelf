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

    const result = yield get(this, 'ajax').request('/searchBooks', {
      method: 'GET',
      data: {
        term
      }
    });

    return result.GoodreadsResponse.search[0].results[0].work.map((work) => {
      return {
        title: work.best_book[0].title[0],
        image: work.best_book[0].image_url[0],
        author: work.best_book[0].author[0].name[0]
      };
    });
  }).restartable()
});
