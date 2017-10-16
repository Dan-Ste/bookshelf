import {
  get,
  setProperties
} from '@ember/object'
import EmberObject from '@ember/object'
import Component from '@ember/component'

const newAuthorInfo = EmberObject.create({
  firstName: null,
  patronymic: null,
  lastName: null
})

const newBookshelfInfo = EmberObject.create({
  title: null
})

export default Component.extend({
  // passed in
  book: null,
  authors: null,

  newAuthorInfo,
  newBookshelfInfo,

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
});
