import Route from '@ember/routing/route';
import BodyClassMixin from 'ember-body-class/mixins/body-class';
import { set } from '@ember/object';

export default Route.extend(BodyClassMixin, {
  classNames: ["ok"],

  init() {
    this._super(...arguments);

    set(this, 'bodyClasses', ["yolo"]);
  },

  actions: {
    addBodyClass() {
      set(this, 'classNames', ["dynamic-yolo"]);
    }
  }
});
