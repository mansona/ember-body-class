import Ember from 'ember';

export function initialize(instance) {
  const config = instance.container.lookupFactory('config:environment');

  // Default to true when not set
  let _includeRouteName = true;
  if (config['ember-body-class'] && config['ember-body-class'].includeRouteName === false) {
    _includeRouteName = false
  }

  Ember.Route.reopen({
    classNames: [],
    bodyClasses: [], // Backwards compatibility

    addClasses: Ember.on('activate', function() {
      const $body = Ember.$('body');
      ['bodyClasses', 'classNames'].forEach((classes) => {
        this.get(classes).forEach(function(klass) {
          $body.addClass(klass);
        });
      });

      if (_includeRouteName) {
        let routeName = this.get('routeName').split('.').get('lastObject');
        $body.addClass(routeName);
      }
    }),

    removeClasses: Ember.on('deactivate', function() {
      const $body = Ember.$('body');
      ['bodyClasses', 'classNames'].forEach((classes) => {
        this.get(classes).forEach(function(klass) {
          $body.removeClass(klass);
        });
      });

      if (_includeRouteName) {
        let routeName = this.get('routeName').split('.').get('lastObject');
        $body.removeClass(routeName);
      }
    }),
  });
}

export default {
  name: 'body-class',
  initialize: initialize
};
