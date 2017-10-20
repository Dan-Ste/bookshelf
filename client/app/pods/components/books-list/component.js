import Component from '@ember/component';
import PropTypes from 'prop-types';

export default Component.extend({
  propTypes: {
    books: PropTypes.emberArray,
  },

  localClassNames: ['books-list']
});
