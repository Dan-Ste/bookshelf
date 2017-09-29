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
  }
} = Ember;

export default Controller.extend({
  firebaseApp: service(),

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

    this.transitionToRoute('books');
  }),

  uploadBookCover() {
    const storageRef = get(this, 'firebaseApp').storage().ref();
    const coverImage = document.getElementById('book-cover-file').files[0];
    const book = get(this, 'book');


    const uploadTask = storageRef.child('images/').put(coverImage, {
      'contentType': coverImage.type
    });

    uploadTask.on('state_changed',
      function (snapshot) {

      },
      function (error) {

      },
      function () {
        const coverImageUrl = uploadTask.snapshot.downloadURL;

        set(book, 'coverImageUrl', coverImageUrl);
      });
  }

});
