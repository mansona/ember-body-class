import $ from 'jquery';
import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import startApp from '../../tests/helpers/start-app';

var application;

module('Acceptance | body class', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    run(application, 'destroy');
  }
});

test('visiting', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');

    /* bodyClass set in dummy application route */
    assert.ok($('body').hasClass('yolo'), "Body class set");
  });
});
