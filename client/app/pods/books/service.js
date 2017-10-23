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

  createBook: task(function* (newBook) {
    const router = get(this, 'router')
    const store = get(this, 'store')
    const records = yield store.findAll('user')
    const user = get(records, 'firstObject')

    set(newBook, 'slug', MakeSlug(get(newBook, 'title')))

    const bookshelf = yield get(newBook, 'bookshelf')
    const author = yield get(newBook, 'author')

    if (get(bookshelf, 'isNew')) {
      set(bookshelf, 'user', user)
    } else {
      get(bookshelf, 'books').addObject(newBook)
    }

    yield bookshelf.save()

    if (get(author, 'isNew')) {
      set(author, 'user', user)
    } else {
      get(author, 'books').addObject(newBook)
    }

    yield author.save()

    set(newBook, 'user', user)

    yield newBook.save()
    yield user.save()

    router.transitionTo('books.index', {
      queryParams: {
        search: null
      }
    })
  }),

  updateBook: task(function* (book) {
    const router = get(this, 'router')

    if (get(book, 'hasDirtyAttributes')) {
      set(book, 'slug', MakeSlug(get(book, 'title')))

      yield book.save()
    }

    router.transitionTo('books.book', get(book, 'slug'))
  }),

  deleteBook: task(function* (book) {
    const router = get(this, 'router')

    yield book.destroyRecord()

    router.transitionTo('books.index', {
      queryParams: {
        search: null
      }
    })
  }),

  uploadBookCover: task(function* (book, image) {
    const store = get(this, 'store')
    const records = yield store.peekAll('user')
    const user = get(records, 'firstObject')
    const firebaseUtil = get(this, 'firebaseUtil')
    const path = `${get(user, 'username')}/images/book-covers/${image.name}`

    try {
      if (get(book, 'coverUrl')) {
        yield fbDeleteFile({
          firebaseUtil,
          url: get(book, 'coverUrl')
        })
      }

      const coverUrl = yield fbUploadFile({
        firebaseUtil,
        file: image,
        path,
        onStateChange: this._onUploadStateChange.bind(this)
      })

      set(book, 'coverUrl', coverUrl)
    } catch (e) {
      Logger.log(e)
    }
  }),

  uploadBookFile: task(function* (book, file) {
    const store = get(this, 'store')
    const records = yield store.peekAll('user')
    const user = get(records, 'firstObject')
    const firebaseUtil = get(this, 'firebaseUtil')
    const path = `${get(user, 'username')}/files/books/${file.name}`

    try {
      if (get(book, 'fileUrl')) {
        yield fbDeleteFile({
          firebaseUtil,
          url: get(book, 'fileUrl')
        })
      }

      const bookFileUrl = yield fbUploadFile({
        firebaseUtil,
        file,
        path,
        onStateChange: this._onUploadStateChange.bind(this)
      })

      set(book, 'fileUrl', bookFileUrl)
    } catch (e) {
      Logger.log(e)
    }
  }),

  addNewAuthor(book, newAuthorInfo) {
    const {
      firstName,
      lastName,
      patronymic
    } = newAuthorInfo

    const newAuthor = get(this, 'store').createRecord('author', {
      firstName,
      lastName,
      patronymic
    })

    set(newAuthor, 'slug', MakeSlug(get(newAuthor, 'fullName')))
    set(book, 'author', newAuthor)
  },

  addNewBookshelf(book, newBookshelfInfo) {
    const {
      title
    } = newBookshelfInfo

    const newBookshelf = get(this, 'store').createRecord('bookshelf', {
      title
    })

    set(newBookshelf, 'slug', MakeSlug(get(newBookshelf, 'title')))
    set(book, 'bookshelf', newBookshelf)
  },

  _onUploadStateChange(snapshot) {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100

    Logger.log('Upload is ' + progress + '% done')
  }
});
