import Route from '@ember/routing/route';
import BodyClassMixin from 'ember-body-class/mixins/body-class';
import { set } from '@ember/object';

export default Route.extend(BodyClassMixin, {
  bodyClasses: Object.freeze(["yolo"]),
  classNames: ["ok"],

  actions: {
    addBodyClass() {
      set(this, 'classNames', ["dynamic-yolo"]);
    }
  }
});
