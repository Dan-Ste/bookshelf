import Component from '@ember/component'
import {
  get
} from '@ember/object'

export default Component.extend({
  localClassNames: ['bookshelf-inline-form'],

  bookshelf: null,

  colors: ['#B03060', '#FE9A76', '#FFD700', '#32CD32', '#008080', '#EE82EE', '#FF1493', '#B413EC'],

  willDestroyElement() {
    this._super(...arguments)

    get(this, 'bookshelf').rollbackAttributes()
  }
});
