import Ember from 'ember';

const {
  Component,
  $
} = Ember;

export default Component.extend({

  didInsertElement() {
    this._super(...arguments);

    $('.ui.sidebar')
      .sidebar({
        context: $('.bottom.segment')
      })
      .sidebar('attach events', '.menu .item');
  }
});
