import Component from '@ember/component';

export default Component.extend({

  localClassNames: ['bookshelf-inline-form'],

  keyUp(e) {
    if(e.keyCode === 13) {
      this.onPressEnter()
    }
  }
});
