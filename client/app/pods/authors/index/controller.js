import Controller from '@ember/controller';
import {
  alias
} from '@ember/object/computed';

export default Controller.extend({
  queryParams: ['searchTerm'],
  searchTerm: null,

  authors: alias('model.authors')
});
