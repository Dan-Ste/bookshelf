import { bool } from '@ember/object/computed';
import BreadCrumbComponent from 'bookshelf/components/bread-crumb'

export default BreadCrumbComponent.extend({
  tagName: 'div',
  classNames: 'section',
  classNameBindings: ['active'],

  active: bool('route.isTail')
});
