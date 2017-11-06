import Controller from '@ember/controller'
import {
  get
} from '@ember/object'
import {
  alias
} from '@ember/object/computed'
import {
  inject as service
} from '@ember/service'


export default Controller.extend({
  authors: service(),

  author: alias('model.author'),

  cancelEditing(author) {
    this.transitionToRoute('authors.author', get(author, 'slug'))
  }
});
