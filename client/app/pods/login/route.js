import Ember from 'ember';

const {
  Route,
  get,
  inject: {
    service
  },
  Logger
} = Ember;

export default Route.extend({
  session: service(),

  actions: {
    login(email, password, username) {

      get(this, 'session').open('firebase', {
        provider: 'password',
        email,
        password
      }).then(({
        uid
      }) => {
        const existedUser = this.store.query('user', {
          orderBy: 'uid',
          equalTo: uid
        });

        if (!existedUser.uid) {
          const newUser = this.store.createRecord('user', {
            uid,
            username,
            email
          });

          newUser.save();
        }
      }).catch(e => Logger.log(e))
    },

    logout() {
      get(this, 'session').close();
    }
  }
});
