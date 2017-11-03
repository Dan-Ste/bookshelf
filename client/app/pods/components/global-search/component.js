import Component from '@ember/component';
import {
  set
} from '@ember/object'

export default Component.extend({
  classNames: ['ui', 'input', 'right', 'action', 'left', 'icon'],

  searchOptions: null,
  searchBy: 'books',

  init() {
    this._super(...arguments)

    set(this, 'searchOptions', ['books', 'authors'])
  }
});
