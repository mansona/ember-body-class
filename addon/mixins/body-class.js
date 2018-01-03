import $ from 'jquery';
import Mixin from '@ember/object/mixin';

export default Mixin.create({
  actions: {
    loading(/* transition, route */) {
      if (!$) { // No jquery in fastboot
        return true;
      }

      $('body').addClass("loading");

      this.router.on('didTransition', function() {
        $('body').removeClass("loading");
      });

      return true;
    },

    error: function(/* error, transition */) {
      if (!$) { // No jquery in fastboot
        return true;
      }

      $('body').addClass("error");

      this.router.on('didTransition', function() {
        $('body').removeClass("error");
      });

      return true;
    }
  }
});
