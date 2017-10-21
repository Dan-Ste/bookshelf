import Component from '@ember/component';
import { computed, get } from '@ember/object';
import { htmlSafe } from '@ember/string';

export default Component.extend({
  attributeBindings: ['style'],
  localClassNames: ['book-cover'],

  book: null,
  isBlank: false,

  coverBg: computed('book.coverUrl', {
    get() {
      const coverUrl = get(this, 'book.coverUrl');
      return htmlSafe(`background-image:url("${coverUrl}")`);
    }
  })
});
