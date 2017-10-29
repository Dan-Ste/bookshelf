import Component from '@ember/component'
import {
  set
} from '@ember/object'

export default Component.extend({
  localClassNames: ['menu-item'],

  isHovering: false,

  mouseEnter() {
    set(this, 'isHovering', true)
  },

  mouseLeave() {
    set(this, 'isHovering', false)
  }
})
