import Ember from 'ember';

export function initialize(instance) {
  const config = instance.container.lookupFactory('config:environment');

  // Default to true when not set
  const _includeRouteName = config['ember-body-class'].includeRouteName !== false;

  Ember.Route.reopen({
    bodyClasses: [],

    addClasses: Ember.on('activate', function() {
      const $body = Ember.$('body');
      this.get('bodyClasses').forEach(function(klass) {
        $body.addClass(klass);
      });

      if (_includeRouteName) {
        $body.addClass(this.get('routeName'));
      }
    }),

    removeClasses: Ember.on('deactivate', function() {
      const $body = Ember.$('body');
      this.get('bodyClasses').forEach(function(klass) {
        $body.removeClass(klass);
      });

      if (_includeRouteName) {
        $body.removeClass(this.get('routeName'));
      }
    }),
  });
}

export default {
  name: 'body-class',
  initialize: initialize
};
