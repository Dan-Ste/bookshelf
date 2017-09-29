import DS from 'ember-data';

const {
  attr,
  belongsTo,
  // hasMany
} = DS;

export default DS.Model.extend({
  title: attr('string'),
  description: attr('string'),
  coverImageUrl: attr('string'),
  pubYear: attr('date'),

  author: belongsTo('author'),
  shelf: belongsTo('shelf'),
  user: belongsTo('user')
});
