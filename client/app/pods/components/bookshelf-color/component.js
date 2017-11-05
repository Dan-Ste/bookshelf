import Component from '@ember/component'
import {
  get,
  computed
} from '@ember/object'
import {htmlSafe} from '@ember/string'

export default Component.extend({
  localClassNameBindings: ['defaultStyle'],
  attributeBindings: ['style'],

  defaultStyle: true,

  style: computed('option', {
    get() {
      return htmlSafe(`background-color: ${get(this, 'option')};`)
    }
  })
});
