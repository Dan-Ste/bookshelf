import { get } from '@ember/object'
import Component from '@ember/component'

export default Component.extend({
  localClassNames: ['upload-button'],
  classNames: ['ui basic button fluid'],
  classNameBindings: ['isUploaded:teal'],

  tagName: 'label',

  // passed in
  fileInputId: null,
  title: null,
  isUploaded: null,

  onLoad() {
    const fileInputId = get(this, 'fileInputId')
    const image = document.getElementById(fileInputId).files[0]

    this.attrs.update(image)
  }
})
