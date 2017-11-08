import Component from '@ember/component'
import {
  get,
  computed
} from '@ember/object'
import BookStates from 'bookshelf/utils/book-states'

export default Component.extend({
  tagName: 'span',
  classNames: ['ui', 'mini', 'tag', 'label'],
  classNameBindings: ['stateObj.color'],

  state: null,

  color: null,
  title: null,

  stateObj: computed('state', {
    get() {
      return BookStates[get(this, 'state')]
    }
  })
})
