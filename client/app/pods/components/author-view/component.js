import Component from '@ember/component';
import {
  set
} from '@ember/object'

export default Component.extend({
  localClassNames: ['author-view'],

  author: null,

  isShowAuthorDeleteConfirm: false,

  openAuthorDeleteConfirm() {
    set(this, 'isShowAuthorDeleteConfirm', true)
  },

  closeAuthorDeleteConfirm() {
    set(this, 'isShowAuthorDeleteConfirm', false)
  }
});
