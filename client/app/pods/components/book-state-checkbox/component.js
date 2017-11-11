import Component from '@ember/component';
import {
  set
} from '@ember/object';

export default Component.extend({
  tagName: '',

  bookState: null,

  onChange(stateId) {
    set(this, 'bookState', Number(stateId))
  }
});
