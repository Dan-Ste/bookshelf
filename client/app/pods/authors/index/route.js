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
        authors: new RSVP.Promise(resolve => {
          this.filterCustomOr(this.store, 'author', {
            'firstName': ['contains', searchTerm],
            'lastName': ['contains', searchTerm],
            'patronymic': ['contains', searchTerm]
          }, authors => resolve(authors))
        })
      })
    } else {
      return hash({
        authors: this.store.findAll('author')
      })
    }
  }
})
