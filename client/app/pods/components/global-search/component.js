import Component from '@ember/component'
import {
  set,
  get
} from '@ember/object'
import {
  inject as service
} from '@ember/service'

export default Component.extend({
  router: service(),

  classNames: ['ui', 'input', 'right', 'action', 'left', 'icon'],

  searchOptions: null,
  searchBy: 'books',

  init() {
    this._super(...arguments)

    set(this, 'searchOptions', ['books', 'authors'])
  },

  onSearch(searchTerm) {
    const router = get(this, 'router')

    switch (get(this, 'searchBy')) {
      case 'books':
        router.transitionTo('books', {
          queryParams: {
            searchTerm
          }
        })
        break;
      case 'authors':
        router.transitionTo('authors', {
          queryParams: {
            searchTerm
          }
        })
        break;
    }
  }
});
