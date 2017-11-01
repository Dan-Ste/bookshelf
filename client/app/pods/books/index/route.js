import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import FindQuery from 'ember-emberfire-find-query/mixins/find-query';

export default Route.extend(FindQuery, {
  queryParams: {
    search: {
      refreshModel: true
    }
  },

  model() {

      // return new RSVP.Promise(resolve => {
      //   this.filterContains(this.store, 'book', {
      //     'title': search
      //   }, books => resolve(books));
      // })

      return this.store.findAll('book')
  }
});
