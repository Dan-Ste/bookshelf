import DS from 'ember-data';

const {
  Model,
  attr,
  hasMany
} = DS;

export default Model.extend({
  uid: attr('string'),
  username: attr('string'),
  avatar: attr('string'),

  books: hasMany('books'),
  shelves: hasMany('shelf')
});
