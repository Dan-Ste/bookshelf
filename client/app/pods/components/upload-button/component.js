import { get, set } from '@ember/object'
import Component from '@ember/component'

export default Component.extend({
  localClassNames: ['upload-button'],
  classNames: ['ui button'],
  classNameBindings: ['withIconClass', 'isUploaded:positive'],

  tagName: 'label',

  // passed in
  fileInputId: null,
  title: null,
  icon: null,
  isUploaded: null,

  withIconClass: null,

  didReceiveAttrs() {
    this._super(...arguments)

    if(get(this, 'icon')) {
      set(this, 'withIconClass', 'icon labeled')
    }
  },

  onLoad() {
    const fileInputId = get(this, 'fileInputId')
    const image = document.getElementById(fileInputId).files[0]

    this.attrs.update(image)
  }
});
