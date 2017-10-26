import Component from '@ember/component'
import {
  computed,
  get
} from '@ember/object'
import {
  htmlSafe
} from '@ember/string'


export default Component.extend({
  tagName: '',

  coverUrl: null,

  coverBg: computed('coverUrl', {
    get() {
      return htmlSafe(`background-image: url(${get(this, 'coverUrl')})`)
    }
  })
});
