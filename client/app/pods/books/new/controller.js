import {
  set,
  get
} from '@ember/object'
import Controller from '@ember/controller'
import {
  alias
} from '@ember/object/computed'
import {
  inject as service
} from '@ember/service'
import Ember from 'ember'
import MakeSlug from 'bookshelf/utils/make-slug'
import UploadFileToFirebase from 'bookshelf/utils/fb-upload-file'
import {
  task
} from 'ember-concurrency'

const {
  Logger
} = Ember

export default Controller.extend({
  firebaseUtil: service(),

  newBook: alias('model.book'),
  authors: alias('model.authors'),
  bookshelves: alias('model.bookshelves'),

  createUser: task(function* (newBook) {
    const records = yield this.store.findAll('user')
    const user = get(records, 'firstObject')

    set(newBook, 'slug', MakeSlug(get(newBook, 'title')))

    get(user, 'books').addObject(newBook)

    yield newBook.save()

    const author = yield this.store.findRecord('author', get(newBook, 'author.id'))
    const bookshelf = yield this.store.findRecord('bookshelf', get(newBook, 'bookshelf.id'))

    get(author, 'books').addObject(newBook)
    get(bookshelf, 'books').addObject(newBook)

    yield author.save()
    yield bookshelf.save()
    yield user.save()

    this.transitionToRoute('books.index')
  }),

  uploadBookCover: task(function* (image) {
    const records = yield this.store.findAll('user')
    const user = get(records, 'firstObject')
    const newBook = get(this, 'newBook')
    const firebaseUtil = get(this, 'firebaseUtil')
    const path = `${get(user, 'username')}/images/book-covers/${image.name}`

    try {
      const coverUrl = yield UploadFileToFirebase({
        firebaseUtil,
        file: image,
        path,
        onStateChange: this._onUploadStateChange.bind(this)
      })

      set(newBook, 'coverUrl', coverUrl)
    } catch (e) {
      Logger.log(e)
    }
  }),

  uploadBookFile: task(function* (file) {
    const records = yield this.store.findAll('user')
    const user = get(records, 'firstObject')
    const newBook = get(this, 'newBook')
    const firebaseUtil = get(this, 'firebaseUtil')
    const path = `${get(user, 'username')}/files/books/${file.name}`

    try {
      const bookFileUrl = yield UploadFileToFirebase({
        firebaseUtil,
        file,
        path,
        onStateChange: this._onUploadStateChange.bind(this)
      })

      set(newBook, 'fileUrl', bookFileUrl)
    } catch (e) {
      Logger.log(e)
    }
  }),

  addNewAuthor: task(function* ({
    firstName,
    patronymic,
    lastName
  }) {
    const records = yield this.store.findAll('user')
    const user = get(records, 'firstObject')
    const newBook = get(this, 'newBook')

    try {
      const newAuthor = this.store.createRecord('author', {
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
    const records = yield this.store.findAll('user')
    const user = get(records, 'firstObject')
    const newBook = get(this, 'newBook')

    try {
      const newBookshelf = this.store.createRecord('bookshelf', {
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

})
