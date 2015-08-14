import Ember from 'ember';
import BodyClassMixin from 'ember-body-class/mixins/body-class';

export default Ember.Route.extend(BodyClassMixin, {
  bodyClasses: ["yolo"]
});
