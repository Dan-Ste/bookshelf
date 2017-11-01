import DS from 'ember-data';

const {
  attr,
  belongsTo
} = DS;

export default DS.Model.extend({
  title: attr('string'),
  description: attr('string'),
  coverUrl: attr('string'),
  fileUrl: attr('string'),
  pubYear: attr('number'),
  slug: attr('string'),
  isActive: attr('boolean'),

  author: belongsTo('author'),
  bookshelf: belongsTo('bookshelf'),
  user: belongsTo('user')
});
