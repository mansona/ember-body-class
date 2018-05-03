import EmberObject from '@ember/object';
import BodyClassMixin from 'ember-body-class/mixins/body-class';
import { module, test } from 'qunit';

module('Unit | Mixin | body class', function() {
  // Replace this with your real tests.
  test('it works', function(assert) {
    var BodyClassObject = EmberObject.extend(BodyClassMixin);
    var subject = BodyClassObject.create();
    assert.ok(subject);
  });
});
