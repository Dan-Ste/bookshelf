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
        const {
          uid,
          displayName,
          photoURL
        } = data.currentUser;

        const existedUser = this.store.query('user', {
          orderBy: 'uid',
          equalTo: uid
        });

        if (!existedUser) {
          const newUser = this.store.createRecord('user', {
            uid,
            username: displayName,
            avatar: photoURL
          });

          newUser.save();
        }
      });
    },

    signOut() {
      get(this, 'session').close();
    }
  }
});
