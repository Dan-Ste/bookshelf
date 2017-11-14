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

  authorPortraitUploadProgress: 0,

  createAuthor: task(function* (newAuthor) {
    const records = yield get(this, 'store').findAll('user')
    const user = get(records, 'firstObject');

    try {
      set(newAuthor, 'slug', MakeSlug(get(newAuthor, 'fullName')));

      get(user, 'authors').addObject(newAuthor);

      yield newAuthor.save();
      yield user.save();

      get(this, 'router').transitionTo('authors.author', get(newAuthor, 'slug'))
    } catch (e) {
      Logger.log(e)
    }
  }),

  deleteAuthor: task(function* (author) {
    const authorBooks = yield get(author, 'books')

    try {
      authorBooks.toArray().forEach(book => {
        set(book, 'bookshelf', null)
      })

      yield author.destroyRecord()

      get(this, 'router').transitionTo('authors.index', {
        queryParams: {
          searchTerm: ''
        }
      })
    } catch (e) {
      Logger.log(e)
    }
  }),

  updateAuthor: task(function* (author) {
    const router = get(this, 'router')
    try {
      if (get(author, 'hasDirtyAttributes')) {
        set(author, 'slug', MakeSlug(get(author, 'fullName')))

        yield author.save()
      }

      router.transitionTo('authors.author', get(author, 'slug'))
    } catch (e) {
      Logger.log(e)
    }
  }),

  uploadAuthorPortrait: task(function* (author, image) {
    const firebaseUtil = get(this, 'firebaseUtil')
    const path = `images/${image.name}`

    set(this, 'authorPortraitUploadProgress', 0)

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
        onStateChange: this._onAuthorPortraitUploadStateChange.bind(this)
      })

      set(author, 'portraitUrl', portraitUrl)
    } catch (e) {
      Logger.log(e)
    }
  }),

  _onAuthorPortraitUploadStateChange(snapshot) {
    const {
      bytesTransferred,
      totalBytes
    } = snapshot

    set(this, 'authorPortraitUploadProgress', (bytesTransferred / totalBytes) * 100)
  }
});
