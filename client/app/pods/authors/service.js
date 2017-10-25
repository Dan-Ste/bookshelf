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

  createAuthor: task(function* (newAuthor) {
    const router = get(this, 'router')
    const records = yield get(this, 'store').findAll('user')
    const user = get(records, 'firstObject');

    set(newAuthor, 'slug', MakeSlug(get(newAuthor, 'fullName')));

    get(user, 'authors').addObject(newAuthor);

    yield newAuthor.save();
    yield user.save();

    router.transitionTo('authors.index')
  }),

  deleteAuthor: task(function* (author) {
    const router = get(this, 'router')

    yield author.destroyRecord()

    router.transitionTo('authors.index')
  }),

  updateAuthor: task(function* (author) {
    const router = get(this, 'router')

    if (get(author, 'hasDirtyAttributes')) {
      set(author, 'slug', MakeSlug(get(author, 'fullName')))

      yield author.save()
    }

    router.transitionTo('authors.author', get(author, 'slug'))
  }),

  uploadAuthorPortrait: task(function* (author, image) {
    const store = get(this, 'store')
    const records = yield store.peekAll('user')
    const user = get(records, 'firstObject')
    const firebaseUtil = get(this, 'firebaseUtil')
    const path = `${get(user, 'username')}/images/authors-portraits/${image.name}`

    try {
      if (get(author, 'portraitUrl')) {
        yield fbDeleteFile({
          firebaseUtil,
          url: get(author, 'portraitUrl')
        })
      }

      const portraitUrl = yield fbUploadFile({
        firebaseUtil,
        file: image,
        path,
        onStateChange: this._onUploadStateChange.bind(this)
      })

      set(author, 'portraitUrl', portraitUrl)
    } catch (e) {
      Logger.log(e)
    }
  }),

  _onUploadStateChange(snapshot) {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100

    Logger.log('Upload is ' + progress + '% done')
  }
});
