import Ember from 'ember';

const {
  Route,
  get
} = Ember;

export default Route.extend({

  model() {
    // if (get(this, 'session.isAuthenticated')) {
    //   return this.store.query('user', {
    //     orderBy: 'uid',
    //     equalTo: get(this, 'session.uid')
    //   });
    // }
  },

  beforeModel(transition) {
    return get(this, 'session').fetch().catch(function () {
      transition.send('accessDenied')
    });
  },

  actions: {
    accessDenied() {
      this.transitionTo('login');
    }
  }
});
