import Mixin from '@ember/object/mixin';
import { getOwner } from '@ember/application';

import { addClass, removeClass } from '../utils/body-class';

export default Mixin.create({
  actions: {
    loading(/* transition, route */) {
      const document = getOwner(this).lookup('service:-document');
      const body = document.body;

      addClass(body, 'loading');

      this.router.on('didTransition', function() {
        removeClass(body, 'loading');
      });

      return true;
    },

    error: function(/* error, transition */) {
      const document = getOwner(this).lookup('service:-document');
      const body = document.body;

      addClass(body, 'error');

      this.router.on('didTransition', function() {
        removeClass(body, 'error');
      });

      return true;
    }
  }
});
