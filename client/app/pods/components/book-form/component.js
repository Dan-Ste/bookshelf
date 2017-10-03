import Ember from 'ember';

const {
  Component
} = Ember;

const authorInfo = Ember.Object.create({
  firstName: null,
  patronymic: null,
  lastName: null,
});

export default Component.extend({
  // passed in
  book: null,
  authors: null,

  authorInfo
});
