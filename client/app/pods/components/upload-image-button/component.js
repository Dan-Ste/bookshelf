import Ember from 'ember';

const {
  get,
  Component
} = Ember;

export default Component.extend({
  // passed in
  fileInputId: null,
  title: null,

  onLoad() {
    const fileInputId = get(this, 'fileInputId');
    const image = document.getElementById(fileInputId).files[0];

    this.attrs.update(image)
  }
});
