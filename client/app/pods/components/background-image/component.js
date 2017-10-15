import { set, get } from '@ember/object';
import Component from '@ember/component';
import { htmlSafe } from '@ember/string';

export default Component.extend({
  attributeBindings: ['style'],
  classNames: ['background-image'],

  // passed in
  url: null,

  didInsertElement() {
    this._super(...arguments);

    const url = get(this, 'url');

    set(this, 'style', htmlSafe(`background-image:url("${url}")`));
  }
});
