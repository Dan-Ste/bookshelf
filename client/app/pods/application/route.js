import Ember from 'ember';

const {
  Route,
  get,
  inject: {
    service
  }
} = Ember;

export default Route.extend({
  session: service(),

  beforeModel() {
    return get(this, 'session').fetch().catch(() => {});
  },

  actions: {
    accessDenied: function() {
      this.transitionTo('login');
    }
  }
});
