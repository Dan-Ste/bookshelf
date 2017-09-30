import Ember from 'ember';
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

  book: alias('model.book'),
  author: alias('model.author'),

  createUser: task(function* (newBook, author) {
    const records = yield this.store.findAll('user')
    const user = get(records, 'firstObject');

    get(user, 'books').addObject(newBook);
    get(author, 'books').addObject(newBook);

    yield newBook.save();
    yield author.save();
    yield user.save();

    this.transitionToRoute('books.index');
  }),

  uploadBookCover: task(function* () {
    const coverImage = document.getElementById('book-cover-file').files[0];
    const records = yield this.store.findAll('user');
    const user = get(records, 'firstObject');
    const book = get(this, 'book');
    const path = `images/book-cover/${get(user, 'username')}/${coverImage.name}`;
    const metadata = {
      'contentType': coverImage.type
    };

    try {
      const coverImageUrl = yield get(this, 'firebaseUtil').uploadFile(path, coverImage, metadata, this._onStateChange);

      set(book, 'coverImageUrl', coverImageUrl);
    } catch (e) {
      Logger.log(e);
    }
  }),

  _onStateChange(snapshot) {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

    Logger.log('Upload is ' + progress + '% done');
  }

});
