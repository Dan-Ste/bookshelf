import Route from '@ember/routing/route';

export default Route.extend({
  breadCrumb: {
    title: 'New Author'
  },

  model() {
    return this.store.createRecord('author');
  }
});
