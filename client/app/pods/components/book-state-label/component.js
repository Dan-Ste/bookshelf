import Component from '@ember/component'
import {
  get,
  computed
} from '@ember/object'
import {
  STATES_INFO
} from 'bookshelf/utils/book-states'

export default Component.extend({
  tagName: 'span',
  classNames: ['ui', 'small', 'label', 'right', 'ribbon'],
  classNameBindings: ['stateInfo.color'],

  state: null,

  stateInfo: computed('state', {
    get() {
      return STATES_INFO[get(this, 'state')]
    }
  })
})
