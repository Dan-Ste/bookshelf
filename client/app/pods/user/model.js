import DS from 'ember-data';

const {
  Model,
  attr,
  hasMany
} = DS;

export default Model.extend({
  uid: attr('string'),
  username: attr('string'),
  email: attr('string'),
  avatar: attr('string'),

  books: hasMany('book'),
  shelves: hasMany('shelf')
});
