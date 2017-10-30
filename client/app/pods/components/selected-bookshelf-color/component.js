import Component from '@ember/component'
import {
  get,
  computed
} from '@ember/object'
import {htmlSafe} from '@ember/string'

export default Component.extend({
  localClassNames: ['selected-color'],
  attributeBindings: ['style'],

  style: computed({
    get() {
      return htmlSafe(`background-color: ${get(this, 'option')}; height: 100%`)
    }
  })
});
