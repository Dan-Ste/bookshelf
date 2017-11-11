import DS from 'ember-data'
import {
  get,
  computed
} from '@ember/object'
import {
  equal
} from '@ember/object/computed'
import {
  BOOK_STATES
} from '../../utils/book-states'

const {
  attr,
  belongsTo,
  Model
} = DS

export default Model.extend({
  title: attr('string'),
  description: attr('string'),
  coverUrl: attr('string'),
  fileUrl: attr('string'),
  pubYear: attr('number'),
  slug: attr('string'),
  state: attr('number'),
  startReading: attr('date'),
  finishReading: attr('date'),

  author: belongsTo('author'),
  bookshelf: belongsTo('bookshelf'),
  user: belongsTo('user'),

  shortDescription: computed('description', {
    get() {
      const description = get(this, 'description')

      return `${description.slice(0, 250)}...`
    }
  }),

  didNotRead: equal('state', BOOK_STATES.DID_NOT_READ),
  isReading: equal('state', BOOK_STATES.READING),
  isRead: equal('state', BOOK_STATES.READ)
})
