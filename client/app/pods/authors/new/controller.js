import Ember from 'ember';
import UploadImageToFirebase from 'bookshelf/utils/fb-upload-image';
import MakeSlug from 'bookshelf/utils/make-slug';
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
  Logger
} = Ember;

export default Controller.extend({
  newAuthor: alias('model'),

  createAuthor: task(function* (newAuthor) {
    const records = yield this.store.findAll('user')
    const user = get(records, 'firstObject');

    set(newAuthor, 'slug', MakeSlug(get(newAuthor, 'fullName')));

    get(user, 'authors').addObject(newAuthor);

    yield newAuthor.save();
    yield user.save();

    this.transitionToRoute('authors.index');
  }),

  uploadAuthorPortrait: task(function* (image) {
    const records = yield this.store.findAll('user');
    const user = get(records, 'firstObject');
    const newAuthor = get(this, 'newAuthor');
    const firebaseUtil = get(this, 'firebaseUtil');

    try {
      const portraitUrl = yield UploadImageToFirebase({
        firebaseUtil,
        image,
        user,
        type: 'author-portrait',
        onStateChange: this._onStateChange.bind(this)
      })

      set(newAuthor, 'portraitUrl', portraitUrl);
    } catch (e) {
      Logger.log(e);
    }
  })
});
