import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('bookshelf-menu-item', 'Integration | Component | bookshelf menu item', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{bookshelf-menu-item}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#bookshelf-menu-item}}
      template block text
    {{/bookshelf-menu-item}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
