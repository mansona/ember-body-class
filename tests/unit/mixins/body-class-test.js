import Ember from 'ember';
import BodyClassMixin from 'ember-body-class/mixins/body-class';
import { module, test } from 'qunit';

module('Unit | Mixin | body class');

// Replace this with your real tests.
test('it works', function(assert) {
  var BodyClassObject = Ember.Object.extend(BodyClassMixin);
  var subject = BodyClassObject.create();
  assert.ok(subject);
});
