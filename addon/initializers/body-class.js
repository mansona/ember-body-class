import Ember from 'ember';

export function initialize(/* container, application */) {
  Ember.Route.reopen({
    bodyClasses: [],

    activate: function() {
      const config = this.container.lookupFactory('config:environment');
      const $body = Ember.$('body');
      this.get('bodyClasses').forEach(function(klass) {
        $body.addClass(klass);
      });

      if (config['ember-body-class'].includeRouteName) {
        $body.addClass(this.get('routeName'));
      }
    },

    deactivate: function() {
      const config = this.container.lookupFactory('config:environment');
      const $body = Ember.$('body');
      this.get('bodyClasses').forEach(function(klass) {
        $body.removeClass(klass);
      });

      if (config['ember-body-class'].includeRouteName) {
        $body.removeClass(this.get('routeName'));
      }
    },
  });
}

export default {
  name: 'body-class',
  initialize: initialize
};
