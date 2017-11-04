import Route from '@ember/routing/route';
import {
  hash
} from 'rsvp'
import RSVP from 'rsvp'
import FindQuery from 'ember-emberfire-find-query/mixins/find-query'

export default Route.extend(FindQuery, {
  queryParams: {
    searchTerm: {
      refreshModel: true
    }
  },

  model({
    searchTerm
  }) {
    if (searchTerm) {
      return hash({
        books: new RSVP.Promise(resolve => {
          this.filterContains(this.store, 'book', {
            'title': searchTerm
          }, books => resolve(books))
        })
      })
    } else {
      return hash({
        books: this.store.findAll('book')
      })
    }
  }
})
