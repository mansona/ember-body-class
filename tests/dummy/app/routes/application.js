import Route from '@ember/routing/route';
import BodyClassMixin from 'ember-body-class/mixins/body-class';

export default Route.extend(BodyClassMixin, {
  init() {
    this._super(...arguments);
    this.bodyClasses = ['yolo'];
  },
});
