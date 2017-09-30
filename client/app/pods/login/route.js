import Ember from 'ember';
import {
  task
} from 'ember-concurrency';

const {
  Route,
  get,
  inject: {
    service
  }
} = Ember;

export default Route.extend({
  session: service(),

  login: task(function* (email, password) {
    try {
      yield get(this, 'session').open('firebase', {
        provider: 'password',
        email,
        password
      })

      this.transitionTo('books');
    } catch (error) {
      switch (error.code) {
        case 'auth/invalid-email':
          this.set('message', 'Please enter a valid email address');
          break;
        case 'auth/user-disabled':
          this.set('message', 'The user associated with the email entered has been disabled.  If you think this happened in error, please contact us.');
          break;
        case 'auth/user-not-found':
          this.set('message', 'There was no user found with the email entered');
          break;
        case 'auth/wrong-password':
          this.set('message', 'The password entered does not match the email entered');
          break;
        default:
          this.set('message', 'There was an error with your login, please try again');
      }
    }
  }),

  actions: {
    login(email, password) {
      get(this, 'login').perform(email, password);
    }
  }
});
