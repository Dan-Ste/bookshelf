import Route from '@ember/routing/route';
import { get } from '@ember/object';

export default Route.extend({

  model() {
    if (get(this, 'session.isAuthenticated')) {
      return this.store.query('user', {
        orderBy: 'uid',
        equalTo: get(this, 'session.uid')
      });
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
