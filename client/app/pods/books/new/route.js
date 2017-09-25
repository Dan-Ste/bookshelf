import Ember from 'ember';

const {
  get,
  Route
} = Ember;

export default Route.extend({
  model() {
    const newBook = this.store.createRecord('book', {
      title: 'My book',
      description: 'Some description',
      pubYear: '2017'
    });

    this.store.findAll('user')
      .then(records => {
        const user = get(records, 'firstObject');

        get(user, 'books').addObject(newBook);
        newBook.save().then(() => user.save()).then(() => this.transitionTo('books'));
      });
  }
});
