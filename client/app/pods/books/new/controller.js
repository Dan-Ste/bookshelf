import {
  set,
  get
} from '@ember/object';
import Controller from '@ember/controller';
import {
  alias
} from '@ember/object/computed';
import {
  inject as service
} from '@ember/service';
import Ember from 'ember';
import MakeSlug from 'bookshelf/utils/make-slug';
import UploadImageToFirebase from 'bookshelf/utils/fb-upload-image';
import {
  task
} from 'ember-concurrency';

const {
  Logger
} = Ember;

export default Controller.extend({
  firebaseUtil: service(),

  newBook: alias('model.book'),
  authors: alias('model.authors'),

  createUser: task(function* (newBook) {
    const records = yield this.store.findAll('user')
    const user = get(records, 'firstObject')

    set(newBook, 'slug', MakeSlug(get(newBook, 'title')))

    get(user, 'books').addObject(newBook)

    yield newBook.save()

    const author = yield this.store.findRecord('author', get(newBook, 'author.id'))
    get(author, 'books').addObject(newBook)

    yield author.save()
    yield user.save()

    this.transitionToRoute('books.index')
  }),

  uploadBookCover: task(function* (image) {
    const records = yield this.store.findAll('user')
    const user = get(records, 'firstObject')
    const newBook = get(this, 'newBook')
    const firebaseUtil = get(this, 'firebaseUtil')

    try {
      const coverImageUrl = yield UploadImageToFirebase({
        firebaseUtil,
        image,
        user,
        type: 'book-cover',
        onStateChange: this._onImageStateChange.bind(this)
      })

      set(newBook, 'coverImageUrl', coverImageUrl)
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

      get(user, 'authors').addObject(newAuthor)
      set(newBook, 'author', newAuthor)

      yield newAuthor.save()
      yield user.save()

    } catch (e) {
      Logger.log(e);
    }
  }),

  _onImageStateChange(snapshot) {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

    Logger.log('Upload is ' + progress + '% done');
  }

});
