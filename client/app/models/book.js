import DS from 'ember-data';

const {
  attr,
  belongsTo,
  hasMany
} = DS;

export default DS.Model.extend({
  title: attr('string'),
  description: attr('string'),
  imageUrl: attr('string'),

  author: belongsTo('author'),
  shelf: belongsTo('shelf'),
  tag: hasMany('tag')
});
