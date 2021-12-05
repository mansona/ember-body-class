import { module, test } from 'qunit';
import { setup, visit, /* mockServer */ } from 'ember-cli-fastboot-testing/test-support';

module('FastBoot | index', function(hooks) {
  setup(hooks);

  test('it renders a page...', async function(assert) {
    const { htmlDocument } = await visit('/');

    assert.dom('h2').hasText('Welcome to Ember');

    assert.dom('body', htmlDocument).hasClass('yolo');
    assert.dom('body', htmlDocument).doesNotHaveClass('null');
  });
});
