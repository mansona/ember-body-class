import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | loading', function(hooks) {
  setupApplicationTest(hooks);

  test('loading class is added correctly', async function(assert) {
    let promise = visit('/slow');

    await new Promise(function(resolve) {
      setTimeout(() => resolve("done!"), 150);
    });

    assert.ok(document.body.classList.contains('loading'), "loading class is missing");

    await promise;

    assert.ok(!document.body.classList.contains('loading'), "loading class is still there after page load");

    assert.equal(currentURL(), '/slow');
  });
});
