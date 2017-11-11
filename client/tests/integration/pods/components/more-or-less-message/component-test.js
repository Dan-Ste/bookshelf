import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('more-or-less-message', 'Integration | Component | more or less message', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{more-or-less-message}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#more-or-less-message}}
      template block text
    {{/more-or-less-message}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
