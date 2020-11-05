/* eslint-disable ember/no-mixins */
import Route from '@ember/routing/route';
import { set } from '@ember/object';
import BodyClassMixin from 'ember-body-class/mixins/body-class';

export default Route.extend(BodyClassMixin, {
  init() {
    this._super(...arguments);

    set(this, 'bodyClasses', ["yolo"]);
  }
});
