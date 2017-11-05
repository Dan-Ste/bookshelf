import Component from '@ember/component'
import {
  get,
  set
} from '@ember/object'
import {
  inject as service
} from '@ember/service'
import $ from 'jquery'

export default Component.extend({
  router: service(),
  bookshelvesService: service('bookshelves'),

  localClassNames: ['menu'],
  classNames: ['ui left large vertical menu fixed'],

  bookshelves: null,
  user: null,
  editBookshelfId: null,

  isShowBookshelfDeleteConfirm: false,
  bookshelfForDeletion: null,

  redirectToNewBook(e) {
    e.preventDefault()
    e.stopPropagation()
    get(this, 'router').transitionTo('books.new')
  },

  redirectToNewAuthor(e) {
    e.preventDefault()
    e.stopPropagation()
    get(this, 'router').transitionTo('authors.new')
  },

  redirectToCurrentlyReading(e) {
    e.preventDefault()
    e.stopPropagation()
    get(this, 'router').transitionTo('books', {
      queryParams: {
        onlyCurrentlyReading: 'true'
      }
    })
  },

  openEditBookshelfModal(e) {
    e.preventDefault()
    e.stopPropagation()
  },

  toggleEditBookshelf(id, e) {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    if (get(this, 'editBookshelfId') === id) {
      set(this, 'editBookshelfId', null)
    } else {
      set(this, 'editBookshelfId', id)
    }
  },

  rollbackBookshelf(bookshelf) {
    bookshelf.rollbackAttributes()
  },

  openDeleteBookshelfConfirm(bookshelf) {
    set(this, 'isShowBookshelfDeleteConfirm', true)
    set(this, 'bookshelfForDeletion', bookshelf)
  },

  closeBookshelfDeleteConfirm() {
    set(this, 'isShowBookshelfDeleteConfirm', false)
    set(this, 'bookshelfForDeletion', null)
  }
});
