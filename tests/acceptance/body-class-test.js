import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | ember body class', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /', async function(assert) {
    await visit('/');

    assert.equal(currentURL(), '/');

    /* bodyClass set in dummy application route */
    assert.ok(document.body.classList.contains('yolo'), "yolo class is missing");
  });

  test('visiting /test', async function(assert) {
    await visit('/test');

    assert.equal(currentURL(), '/test');

    /* bodyClass set in dummy application route */
    assert.ok(document.body.classList.contains('yolo'), "yolo class is missing");
    assert.ok(document.body.classList.contains('another-yolo'), "another-yolo class is missing");
  });
});
