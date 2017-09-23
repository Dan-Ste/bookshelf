import DS from 'ember-data';

const {
  attr,
  hasMany
} = DS;

export default DS.Model.extend({
  name: attr('string'),
  description: attr('string'),
  imageUrl: attr('string'),

  books: hasMany('book')
});
