import Ember from 'ember';
import BreadCrumbComponent from 'bookshelf/components/bread-crumb'

const {
  computed: {
    bool
  }
} = Ember;

export default BreadCrumbComponent.extend({
  tagName: 'div',
  classNames: 'section',
  classNameBindings: ['active'],

  active: bool('route.isTail')
});
