import Mixin from '@ember/object/mixin';

import { addClass, removeClass } from '../util/bodyClass';

export default Mixin.create({
  actions: {
    loading(/* transition, route */) {
      const document = this.owner.lookup('service:-document');
      const body = document.body;

      addClass(body, 'loading');

      this.router.on('didTransition', function() {
        removeClass(body, 'loading');
      });

      return true;
    },

    error: function(/* error, transition */) {
      const document = this.owner.lookup('service:-document');
      const body = document.body;

      addClass(body, 'error');

      this.router.on('didTransition', function() {
        removeClass(body, 'error');
      });

      return true;
    }
  }
});
