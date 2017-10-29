import Component from '@ember/component'
import {
  get
} from '@ember/object'
import {
  inject as service
} from '@ember/service'


export default Component.extend({
  router: service(),

  localClassNames: ['menu'],
  classNames: ['ui left large vertical menu fixed'],

  bookshelves: null,
  user: null,

  redirectToNewBook(e) {
    e.preventDefault()
    e.stopPropagation()
    get(this, 'router').transitionTo('books.new')
  },

  redirectToNewAuthor(e) {
    e.preventDefault()
    e.stopPropagation()
    get(this, 'router').transitionTo('authors.new')
  }
});
