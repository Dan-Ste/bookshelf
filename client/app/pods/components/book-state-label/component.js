import Component from '@ember/component';
import {
  get,
  set
} from '@ember/object';
import * as BookStates from 'bookshelf/utils/book-states'

export default Component.extend({
  tagName: 'span',
  classNames: ['ui', 'mini', 'tag', 'label'],
  classNameBindings: ['color'],

  state: null,

  color: null,
  title: null,

  init() {
    this._super(...arguments);

    switch (get(this, 'state')) {
      case BookStates.DID_NOT_READ:
        set(this, 'color', 'orange')
        set(this, 'title', 'Didn\'t read')
        break;
      case BookStates.READING:
        set(this, 'color', 'yellow')
        set(this, 'title', 'Reading')
        break;
      case BookStates.READ:
        set(this, 'color', 'teal')
        set(this, 'title', 'Read')
        break;
    }
  }
});
