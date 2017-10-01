import Ember from 'ember';

const {
  Controller,
  computed: {
    alias
  }
} = Ember;

export default Controller.extend({
  queryParams: ['search'],
  search: null,

  books: alias('model')
});
