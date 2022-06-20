/* eslint-disable prettier/prettier, qunit/no-negated-ok */
import { module, test } from 'qunit';
import { click, visit, currentURL } from '@ember/test-helpers';
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

  test('make sure there are no null values', async function(assert) {
    await visit('/test');

    assert.ok(!document.body.classList.contains('null'), "body has null class");
  });

  test('body class updated when classNames route property is updated', async function(assert){
    await visit('/');

    await click('button.add-body-class');
    assert.ok(document.body.classList.contains('dynamic-yolo'), "dynamic-yolo added");
  });
});

