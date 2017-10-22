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

    get(user, 'books').addObject(newBook)

    yield newBook.save()

    const author = yield store.findRecord('author', get(newBook, 'author.id'))
    const bookshelf = yield store.findRecord('bookshelf', get(newBook, 'bookshelf.id'))

    get(author, 'books').addObject(newBook)
    get(bookshelf, 'books').addObject(newBook)

    yield author.save()
    yield bookshelf.save()
    yield user.save()

    router.transitionTo('books.index')
  }),

  updateBook: task(function* (book) {
    const router = get(this, 'router')

    if (get(book, 'hasDirtyAttributes')) {
      set(book, 'slug', MakeSlug(get(book, 'title')))

      yield book.save()
    }

    router.transitionTo('books.book', get(book, 'slug'))
  }),

  uploadBookCover: task(function* (book, image) {
    const store = get(this, 'store')
    const records = yield store.findAll('user')
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
    const records = yield store.findAll('user')
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

  addNewAuthor: task(function* ({
    firstName,
    patronymic,
    lastName
  }) {
    const store = get(this, 'store')
    const records = yield store.findAll('user')
    const user = get(records, 'firstObject')
    const newBook = get(this, 'newBook')

    try {
      const newAuthor = store.createRecord('author', {
        firstName,
        patronymic,
        lastName
      })

      set(newAuthor, 'slug', MakeSlug(get(newAuthor, 'fullName')))

      get(user, 'authors').addObject(newAuthor)
      set(newBook, 'author', newAuthor)

      yield newAuthor.save()
      yield user.save()

    } catch (e) {
      Logger.log(e)
    }
  }),

  addNewBookshelf: task(function* ({
    title
  }) {
    const store = get(this, 'store')
    const records = yield store.findAll('user')
    const user = get(records, 'firstObject')
    const newBook = get(this, 'newBook')

    try {
      const newBookshelf = store.createRecord('bookshelf', {
        title
      })

      get(user, 'bookshelves').addObject(newBookshelf)
      set(newBook, 'bookshelf', newBookshelf)

      yield newBookshelf.save()
      yield user.save()

    } catch (e) {
      Logger.log(e)
    }
  }),

  _onUploadStateChange(snapshot) {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100

    Logger.log('Upload is ' + progress + '% done')
  }
});
