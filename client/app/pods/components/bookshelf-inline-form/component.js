import Component from '@ember/component'
import {
  get
} from '@ember/object'
import BookshelfColors from '../../../utils/bookshelf-colors'

export default Component.extend({
  localClassNames: ['bookshelf-inline-form'],

  bookshelf: null,
  BookshelfColors,

  willDestroyElement() {
    this._super(...arguments)

    get(this, 'bookshelf').rollbackAttributes()
  }
});
