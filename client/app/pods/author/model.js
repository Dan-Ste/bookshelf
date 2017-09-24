import DS from 'ember-data';

const {
  attr,
  hasMany
} = DS;

export default DS.Model.extend({
  name: attr('string'),
  biography: attr('string'),
  birthYear: attr('date'),
  imageUrl: attr('string'),

  books: hasMany('book')
});
