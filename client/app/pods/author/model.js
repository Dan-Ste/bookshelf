import DS from 'ember-data';

const {
  attr,
  hasMany,
  belongsTo
} = DS;

export default DS.Model.extend({
  firstName: attr('string'),
  lastName: attr('string'),
  patronymic: attr('string'),
  biography: attr('string'),
  birthYear: attr('date'),
  portraitUrl: attr('string'),

  books: hasMany('book'),
  user: belongsTo('user')
});
