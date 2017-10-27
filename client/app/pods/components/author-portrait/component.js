import Component from '@ember/component';
import {
  computed,
  get
} from '@ember/object'
import {
  htmlSafe
} from '@ember/string'

export default Component.extend({
  tagName: '',

  portraitUrl: null,

  portraitBg: computed('portraitUrl', {
    get() {
      const portraitUrl = get(this, 'portraitUrl');
      const placeholder = '/img/avatar-placeholder.png'
      const portraitBg = portraitUrl ? portraitUrl : placeholder;

      return htmlSafe(`background-image: url(${portraitBg})`)
    }
  })
});
