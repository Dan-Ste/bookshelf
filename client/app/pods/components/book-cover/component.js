import Component from '@ember/component';
import { computed, get } from '@ember/object';
import { htmlSafe } from '@ember/string';

export default Component.extend({
  attributeBindings: ['style'],
  localClassNames: ['book-cover'],

  book: null,
  isBlank: false,

  coverBg: computed('book.coverImageUrl', {
    get() {
      const coverImageUrl = get(this, 'book.coverImageUrl');
      return htmlSafe(`background-image:url("${coverImageUrl}")`);
    }
  })
});
