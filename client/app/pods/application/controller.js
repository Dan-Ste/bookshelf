import Ember from 'ember';

const {
  get,
  inject: {
    service
  }
} = Ember;

export default Ember.Controller.extend({
  session: service(),

  actions: {
    invalidateSession() {
      get(this, 'session').invalidate();
    }
  }
});
