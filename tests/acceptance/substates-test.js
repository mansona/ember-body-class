/* eslint-disable prettier/prettier, qunit/no-negated-ok */
import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | substates', function(hooks) {
  setupApplicationTest(hooks);

  test('loading class is added correctly', async function(assert) {
    let promise = visit('/slow');

    await new Promise(function(resolve) {
      setTimeout(() => resolve(), 150);
    });

    assert.ok(document.body.classList.contains('loading'), "loading class is missing");

    await promise;

    assert.ok(!document.body.classList.contains('loading'), "loading class is still there after page load");

    assert.equal(currentURL(), '/slow');
  });

  test('error class is added correctly', async function(assert) {
    await visit('/bad');

    assert.ok(document.body.classList.contains('error'), "error class is missing");

    await visit('/');

    assert.ok(!document.body.classList.contains('error'), "error class is still there after page load");
  })
});
