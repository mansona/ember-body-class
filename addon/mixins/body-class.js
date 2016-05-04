import Ember from 'ember';

export default Ember.Mixin.create({
  actions: {
    loading(/* transition, route */) {
      if (!Ember.$) { // No jquery in fastboot
        return true;
      }

      Ember.$('body').addClass("loading");

      this.router.on('didTransition', function() {
        Ember.$('body').removeClass("loading");
      });

      return true;
    },

    error: function(/* error, transition */) {
      if (!Ember.$) { // No jquery in fastboot
        return true;
      }

      Ember.$('body').addClass("error");

      this.router.on('didTransition', function() {
        Ember.$('body').removeClass("error");
      });

      return true;
    }
  }
});
