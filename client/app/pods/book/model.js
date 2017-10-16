import DS from 'ember-data';

const {
  attr,
  belongsTo
} = DS;

export default DS.Model.extend({
  title: attr('string'),
  description: attr('string'),
  coverImageUrl: attr('string'),
  pubYear: attr('number'),
  slug: attr('string'),

  author: belongsTo('author'),
  bookshelf: belongsTo('bookshelf'),
  user: belongsTo('user')
});
