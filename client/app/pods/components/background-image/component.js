import Ember from 'ember';

const {
  get,
  set,
  Component,
  String: {
    htmlSafe
  }
} = Ember;

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
