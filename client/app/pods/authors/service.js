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
  fbUploadFile,
  fbDeleteFile
} from 'bookshelf/utils/fb-upload-file'
import {
  task
} from 'ember-concurrency'

const {
  Logger
} = Ember

export default Service.extend({
  firebaseUtil: service(),
  store: service(),
  router: service(),

  deleteBook: task(function* (author) {
    const router = get(this, 'router')

    yield author.destroyRecord()

    router.transitionTo('authors.index')
  })
});
