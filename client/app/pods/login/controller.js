import Ember from 'ember';

const {
  get,
  set,
  getProperties,
  inject: {
    service
  },
  Controller
} = Ember;

export default Controller.extend({
  session: service(),

  actions: {
    authenticate() {
      let {
        identification,
        password
      } = getProperties(this, 'identification', 'password');

      get(this, 'session').authenticate('authenticator:oauth2', identification, password).catch((reason) => {
        set(this, 'errorMessage', reason.error || reason);
      });
    }
  }
});
