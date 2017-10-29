import Ember from 'ember'
import Service from '@ember/service';
import {
  set,
  get
} from '@ember/object'
import {
  inject as service
} from '@ember/service'
import MakeSlug from 'bookshelf/utils/make-slug'
import {
  task
} from 'ember-concurrency'

const {
  Logger
} = Ember

export default Service.extend({
  store: service(),

  createNewBookshelf: task(function* () {
    try {
      const newBookshelf = get(this, 'store').createRecord('bookshelf', {
        title: 'New Bookshelf'
      })

      yield newBookshelf.save()
    } catch (e) {
      Logger.log(e)
    }
  }),

  updateBookshelf: task(function* (bookshelf) {
    try {

      yield bookshelf.save()
    } catch (e) {
      Logger.log(e)
    }
  }),

});
