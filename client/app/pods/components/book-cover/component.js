import Component from '@ember/component'
import {
  computed,
  get
} from '@ember/object'
import {
  htmlSafe
} from '@ember/string'
import {
  BOOK_STATES
} from '../../../utils/book-states'

export default Component.extend({
  tagName: '',

  coverUrl: null,

  BOOK_STATES,

  coverBg: computed('coverUrl', {
    get() {
      return htmlSafe(`background-image: url(${get(this, 'coverUrl')})`)
    }
  })
});
