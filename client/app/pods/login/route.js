import Route from '@ember/routing/route';
import { set, get } from '@ember/object';
import { inject as service } from '@ember/service';
import {
  task
} from 'ember-concurrency';

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
          set(this, 'controller.message', 'Please enter a valid email address');
          break;
        case 'auth/user-disabled':
          set(this, 'controller.message', 'The user associated with the email entered has been disabled.  If you think this happened in error, please contact us.');
          break;
        case 'auth/user-not-found':
          set(this, 'controller.message', 'There was no user found with the email entered');
          break;
        case 'auth/wrong-password':
          set(this, 'controller.message', 'The password entered does not match the email entered');
          break;
        default:
          set(this, 'controller.message', 'There was an error with your login, please try again');
      }
    }
  }),

  actions: {
    login(email, password) {
      get(this, 'login').perform(email, password);
    }
  }
});
