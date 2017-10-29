import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bookshelf-inline-form', 'Integration | Component | bookshelf inline form', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{bookshelf-inline-form}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#bookshelf-inline-form}}
      template block text
    {{/bookshelf-inline-form}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
