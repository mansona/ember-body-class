import Route from '@ember/routing/route';
import { set } from '@ember/object';

export default Route.extend({
  init() {
    this._super(...arguments);

    set(this, 'bodyClasses', ["another-yolo"]);
  }
});
