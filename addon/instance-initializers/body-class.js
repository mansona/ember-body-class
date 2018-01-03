import { on } from '@ember/object/evented';
import Route from '@ember/routing/route';
import $ from 'jquery';

export function initialize(instance) {
  if (!$) { // No jquery in fastboot
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

  Route.reopen({
    init() {
      this._super(...arguments);
      this.classNames = [];
      this.bodyClasses = []; // Backwards compatibility
    },

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

    addClasses: on('activate', function() {
      const $body = $('body');
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

    removeClasses: on('deactivate', function() {
      const $body = $('body');
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
