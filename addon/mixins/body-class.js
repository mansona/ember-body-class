/* eslint-disable ember/no-new-mixins, prettier/prettier */
import Mixin from '@ember/object/mixin';
import { getOwner } from '@ember/application';
import { inject as service } from '@ember/service';

import { addClass, removeClass } from '../util/bodyClass';

export default Mixin.create({
  router: service(),
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

      this.router.on('routeDidChange', () => {
        if(this.router.currentRouteName !== 'error') {
          removeClass(body, 'error');
        }
      });

      return true;
    }
  }
});
