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
        title: 'New Bookshelf',
        color: '#A0A0A0'
      })

      set(newBookshelf, 'slug', MakeSlug(get(newBookshelf, 'title')))

      yield newBookshelf.save()
    } catch (e) {
      Logger.log(e)
    }
  }),

  updateBookshelf: task(function* (bookshelf) {
    try {
      if (get(bookshelf, 'hasDirtyAttributes')) {
        set(bookshelf, 'slug', MakeSlug(get(bookshelf, 'title')))

        yield bookshelf.save()
      }

    } catch (e) {
      Logger.log(e)
    }
  }),

});
