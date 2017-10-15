import EmberObject from '@ember/object';
import Component from '@ember/component';

const authorInfo = EmberObject.create({
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
