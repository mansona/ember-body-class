import Ember from 'ember';

export function initialize(instance) {
  if (!Ember.$) { // No jquery in fastboot
    return;
  }

  var config;
  if (instance.resolveRegistration) {
    // Ember 2.1+
    // http://emberjs.com/blog/2015/08/16/ember-2-1-beta-released.html#toc_registry-and-container-reform
    config = instance.resolveRegistration('config:environment');
  } else {
    config = instance.container.lookupFactory('config:environment');
  }

  // Default to true when not set
  let _includeRouteName = true;
  if (config['ember-body-class'] && config['ember-body-class'].includeRouteName === false) {
    _includeRouteName = false;
  }

  Ember.Route.reopen({
    classNames: [],
    bodyClasses: [], // Backwards compatibility

    _getRouteDepthClasses() {
      let routeParts = this.get('routeName').split('.');
      let routeDepthClasses = routeParts.slice(0);
      let currentSelector = [];

      routeParts.forEach((part)=> {
        currentSelector.push(part);

        routeDepthClasses.push(currentSelector.join(`-`));
      });

      return routeDepthClasses;
    },

    addClasses: Ember.on('activate', function() {
      const $body = Ember.$('body');
      ['bodyClasses', 'classNames'].forEach((classes) => {
        this.get(classes).forEach(function(klass) {
          $body.addClass(klass);
        });
      });

      if (_includeRouteName) {
        this._getRouteDepthClasses().forEach((depthClass)=> {
          $body.addClass(depthClass);
        });
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
        this._getRouteDepthClasses().forEach((depthClass)=> {
          $body.removeClass(depthClass);
        });
      }
    }),
  });
}

export default {
  name: 'body-class',
  initialize: initialize
};
