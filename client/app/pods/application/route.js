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
    signIn(provider) {
      get(this, 'session').open('firebase', {
        provider: provider
      }).then(data => {
        console.log(data.currentUser);
      });
    },

    signOut() {
      get(this, 'session').close();
    }
  }
});
