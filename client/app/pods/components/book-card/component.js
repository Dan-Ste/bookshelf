import Ember from 'ember';

const {
  get,
  computed,
  String: {
    htmlSafe
  }
} = Ember;

export default Ember.Component.extend({
  attributeBindings: ['style'],
  localClassNames: ['book-card'],

  book: null,
  isBlank: false,

  coverBg: computed({
    get() {
      const coverImageUrl = get(this, 'book.coverImageUrl');
      return htmlSafe(`background-image:url("${coverImageUrl}")`);
    }
  })
});
