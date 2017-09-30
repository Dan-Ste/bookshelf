import Ember from 'ember';
import FindQuery from 'ember-emberfire-find-query/mixins/find-query';

const {
  Route,
  RSVP
} = Ember;

export default Route.extend(FindQuery, {
  queryParams: {
    search: {
      refreshModel: true
    }
  },

  model({
    search
  }) {
    if (search) {
      return new RSVP.Promise(resolve => {
        this.filterContains(this.store, 'book', {
          'title': search
        }, books => resolve(books));
      })
    } else {
      return this.store.query('book', {
        orderBy: 'title'
      })
    }
  }
});
