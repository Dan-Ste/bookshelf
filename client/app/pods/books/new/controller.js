import Ember from 'ember';
import MakeSlug from 'bookshelf/utils/make-slug';
import UploadImageToFirebase from 'bookshelf/utils/fb-upload-image';
import {
  task
} from 'ember-concurrency';

const {
  get,
  set,
  Controller,
  computed: {
    alias
  },
  inject: {
    service
  },
  Logger
} = Ember;

export default Controller.extend({
  firebaseUtil: service(),

  newBook: alias('model.book'),
  author: alias('model.author'),

  createUser: task(function* (newBook, author) {
    const records = yield this.store.findAll('user')
    const user = get(records, 'firstObject');

    set(newBook, 'slug', MakeSlug(get(newBook, 'title')));

    get(user, 'books').addObject(newBook);
    get(author, 'books').addObject(newBook);

    yield newBook.save();
    yield author.save();
    yield user.save();

    this.transitionToRoute('books.index');
  }),

  uploadBookCover: task(function* (image) {
    const records = yield this.store.findAll('user');
    const user = get(records, 'firstObject');
    const newBook = get(this, 'newBook');
    const firebaseUtil = get(this, 'firebaseUtil');

    try {
      const coverImageUrl = yield UploadImageToFirebase({
        firebaseUtil,
        image,
        user,
        type: 'book-cover',
        onStateChange: this._onStateChange.bind(this)
      })

      set(newBook, 'coverImageUrl', coverImageUrl);
    } catch (e) {
      Logger.log(e);
    }
  }),

  _onStateChange(snapshot) {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

    Logger.log('Upload is ' + progress + '% done');
  }

});
