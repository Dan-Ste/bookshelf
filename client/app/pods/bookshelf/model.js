import DS from 'ember-data';

const {
  Model,
  attr,
  hasMany
} = DS;

export default Model.extend({
  title: attr('string'),
  color: attr('string'),
  slug: attr('string'),
  books: hasMany('book')
});
