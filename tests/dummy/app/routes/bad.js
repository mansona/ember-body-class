/* eslint-disable ember/no-mixins */
import Route from '@ember/routing/route';
import BodyClassMixin from 'ember-body-class/mixins/body-class';

export default Route.extend(BodyClassMixin, {
  model() {
    return new Promise((resolve, reject) => {
      reject(new Error('oops!'));
    })
  }
});
