import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../../tests/helpers/start-app';

var application;

module('Acceptance | body class', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('visiting', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');

    /* bodyClass set in dummy application route */
    assert.ok(Ember.$('body').hasClass('yolo'), "Body class set");
  });
});
