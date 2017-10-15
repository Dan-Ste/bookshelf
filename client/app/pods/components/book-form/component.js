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

export default Component.extend({
  // passed in
  book: null,
  authors: null,

  newAuthorInfo,

  cleanNewAuthorInfo() {
    const newAuthorInfo = get(this, 'newAuthorInfo')

    setProperties(newAuthorInfo, {
      firstName: null,
      patronymic: null,
      lastName: null
    })
  }
});
