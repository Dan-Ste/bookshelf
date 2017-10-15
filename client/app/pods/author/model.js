import { computed, get } from '@ember/object'
import DS from 'ember-data'

const {
  attr,
  hasMany,
  belongsTo
} = DS

export default DS.Model.extend({
  firstName: attr('string'),
  lastName: attr('string'),
  patronymic: attr('string'),
  biography: attr('string'),
  birthYear: attr('date'),
  portraitUrl: attr('string'),
  slug: attr('string'),

  books: hasMany('book'),
  user: belongsTo('user'),

  fullName: computed('firstName', 'patronymic', 'lastName', {
    get() {
      const firstName = get(this, 'firstName')
      const lastName = get(this, 'lastName')
      const patronymic = get(this, 'patronymic')

      return patronymic ?
        `${firstName} ${patronymic} ${lastName}` :
        `${firstName} ${lastName}`
    }
  }),

  fullInitials: computed('firstName', 'patronymic', 'lastName', {
    get() {
      const firstName = get(this, 'firstName')
      const lastName = get(this, 'lastName')
      const patronymic = get(this, 'patronymic')

      return patronymic ?
        `${lastName} ${firstName.charAt(0).toUpperCase()}.${patronymic.charAt(0).toUpperCase()}.` :
        `${lastName} ${firstName.charAt(0)}.`
    }
  })
})
