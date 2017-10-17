import Route from '@ember/routing/route';
import {
  get
} from '@ember/object';
import {
  hash
} from 'rsvp'

export default Route.extend({

  model() {
    if (get(this, 'session.isAuthenticated')) {
      return hash({
        user: this.store.query('user', {
          orderBy: 'uid',
          equalTo: get(this, 'session.uid')
        }),
        bookshelves: this.store.findAll('bookshelf')
      })
    }
  },

  beforeModel(transition) {
    return get(this, 'session').fetch().catch(function () {
      transition.send('accessDenied')
    });
  },

  actions: {
    accessDenied() {
      this.transitionTo('login');
    },

    logout() {
      get(this, 'session').close();
      this.transitionTo('login');
    }
  }
});
