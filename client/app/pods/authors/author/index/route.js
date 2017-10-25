import Route from '@ember/routing/route'
import {
  hash
} from 'rsvp';

export default Route.extend({

  model({
    slug
  }) {
    return hash({
      author: this.store.query('author', {
        orderBy: 'slug',
        equalTo: slug
      })
    })
  }
});
