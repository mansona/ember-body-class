import Mixin from '@ember/object/mixin';
import { getOwner } from '@ember/application';

import { addClass, removeClass } from '../util/bodyClass';

export default Mixin.create({
  actions: {
    loading(transition) {
      const document = getOwner(this).lookup('service:-document');
      const body = document.body;

      addClass(body, 'loading');

      transition.finally(function() {
        removeClass(body, 'loading');
      });

      return true;
    },

    error: function(/* error, transition */) {
      const document = getOwner(this).lookup('service:-document');
      const body = document.body;

      addClass(body, 'error');

      let router = this._router

      if(router) {
        router.on('didTransition', function() {
          removeClass(body, 'error');
        });
      }

      return true;
    }
  }
});
