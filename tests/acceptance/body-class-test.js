import { currentURL, visit } from '@ember/test-helpers';
import $ from 'jquery';
import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import startApp from '../../tests/helpers/start-app';

var application;

module('Acceptance | body class', function(hooks) {
  hooks.beforeEach(function() {
    application = startApp();
  });

  hooks.afterEach(function() {
    run(application, 'destroy');
  });

  test('visiting', async function(assert) {
    await visit('/');

    assert.equal(currentURL(), '/');

    /* bodyClass set in dummy application route */
    assert.ok($('body').hasClass('yolo'), "Body class set");
  });
});
