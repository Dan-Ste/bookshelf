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

  preventDefaultAndPropagation(e) {
    e.preventDefault()
    e.stopPropagation()
  },

  redirectToNewBook() {
    get(this, 'router').transitionTo('books.new')
  },

  redirectToNewAuthor() {
    get(this, 'router').transitionTo('authors.new')
  },

  // redirectToCurrentlyReading(e) {
  //   e.preventDefault()
  //   e.stopPropagation()
  //   get(this, 'router').transitionTo('books', {
  //     queryParams: {
  //       onlyCurrentlyReading: 'true'
  //     }
  //   })
  // },

  toggleEditBookshelf(id) {
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

    // If appears in the currently deleting bookshelf route - transition to books route
    if (get(this, 'router.currentURL').includes(get(this, 'bookshelfForDeletion.slug'))) {
      get(this, 'router').transitionTo('books.index', {
        queryParams: {
          searchTerm: ''
        }
      })
    }

    set(this, 'bookshelfForDeletion', null)
  }
});
