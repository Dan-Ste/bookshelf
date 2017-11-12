import Component from '@ember/component'
import {
  computed,
  get
} from '@ember/object'
import {
  htmlSafe
} from '@ember/string'

export default Component.extend({
  localClassNames: ['cover'],
  attributeBindings: ['style'],

  book: null,

  style: computed('book.coverUrl', 'book.bookshelf.color', {
    get() {
      const coverColor = get(this, 'book.bookshelf.color') || '#dadada'

      return htmlSafe(`background-image: url(${get(this, 'book.coverUrl')}); background-color: ${coverColor}`)
    }
  })
})
