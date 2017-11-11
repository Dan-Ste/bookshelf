import {
  set,
  get,
  setProperties
} from '@ember/object'
import EmberObject from '@ember/object'
import Component from '@ember/component'
import {
  BOOK_STATES,
  STATES_INFO
} from '../../../utils/book-states'

const newAuthorInfo = EmberObject.create({
  firstName: null,
  patronymic: null,
  lastName: null
})

const newBookshelfInfo = EmberObject.create({
  title: null
})

export default Component.extend({
  localClassNames: ['book-form'],

  // passed in
  book: null,
  authors: null,

  isAddNewAuthor: false,
  isAddNewBookshelf: false,

  newAuthorInfo,
  newBookshelfInfo,

  BOOK_STATES,
  STATES_INFO,

  cleanNewAuthorInfo() {
    const newAuthorInfo = get(this, 'newAuthorInfo')

    setProperties(newAuthorInfo, {
      firstName: null,
      patronymic: null,
      lastName: null
    })
  },

  cleanNewBookshelfInfo() {
    const newBookshelfInfo = get(this, 'newBookshelfInfo')

    setProperties(newBookshelfInfo, {
      title: null
    })
  }
})
