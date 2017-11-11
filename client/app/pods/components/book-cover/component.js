import Component from '@ember/component'
import {
  computed,
  get
} from '@ember/object'
import {
  htmlSafe
} from '@ember/string'

export default Component.extend({
  tagName: '',

  book: null,

  coverBg: computed('book.coverUrl', {
    get() {
      return htmlSafe(`background-image: url(${get(this, 'book.coverUrl')})`)
    }
  })
})
