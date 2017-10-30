import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('selected-bookshelf-color', 'Integration | Component | selected bookshelf color', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{selected-bookshelf-color}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#selected-bookshelf-color}}
      template block text
    {{/selected-bookshelf-color}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
