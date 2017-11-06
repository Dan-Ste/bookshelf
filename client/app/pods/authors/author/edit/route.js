import Route from '@ember/routing/route'
import {
  hash
} from 'rsvp';
import {
  get
} from '@ember/object'

export default Route.extend({

  model() {
    return hash({
      author: this.modelFor('authors.author')
    })
  },

  actions: {
    willTransition() {
      const author = get(this, 'controller.author')

      if (get(author, 'hasDirtyAttributes')) {
        author.rollbackAttributes()
      }
    }
  }
});
