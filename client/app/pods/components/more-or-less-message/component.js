import Component from '@ember/component';
import {
  computed,
  get
} from '@ember/object';

export default Component.extend({
  tagName: '',

  message: null,

  isMessagesEqual: computed({
    get() {
      return get(this, 'message.length') === get(this, 'shortMessage.length')
    }
  }),

  shortMessage: computed('message', {
    get() {
      return get(this, 'message').slice(0, 250)
    }
  })
});
