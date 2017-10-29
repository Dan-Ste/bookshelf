import Route from '@ember/routing/route'
import {
  hash
} from 'rsvp';

export default Route.extend({

  model() {
    return hash({
      author: this.modelFor('authors.author'),
    })
  }
});
