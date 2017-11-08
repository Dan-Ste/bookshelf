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
  classNames: ['ui', 'mini', 'tag', 'label'],
  classNameBindings: ['stateInfo.color'],

  state: null,

  color: null,
  title: null,

  stateInfo: computed('state', {
    get() {
      return STATES_INFO[get(this, 'state')]
    }
  })
})
