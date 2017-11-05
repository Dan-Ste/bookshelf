import Component from '@ember/component'
import {
  set
} from '@ember/object'

export default Component.extend({
  localClassNames: ['book-view'],

  isShowBookDeleteConfirm: false,

  openBookDeleteConfirm() {
    set(this, 'isShowBookDeleteConfirm', true)
  },

  closeBookDeleteConfirm() {
    set(this, 'isShowBookDeleteConfirm', false)
  }
})
