import Route from '@ember/routing/route';

import { addClass, removeClass } from '../utils/body-class';

export function initialize(instance) {
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
    classNames: [],
    bodyClasses: Object.freeze([]),

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

    activate() {
      this._super(...arguments);
      const document = instance.lookup('service:-document');
      const body = document.body;
      ['bodyClasses', 'classNames'].forEach((classes) => {
        this.get(classes).forEach(function(klass) {
          addClass(body, klass);
        });
      });

      if (_includeRouteName) {
        this._getRouteDepthClasses().forEach((depthClass)=> {
          addClass(body, depthClass);
        });
      }
    },

    deactivate() {
      this._super(...arguments);
      const document = instance.lookup('service:-document');
      const body = document.body;

      ['bodyClasses', 'classNames'].forEach((classes) => {
        this.get(classes).forEach(function(klass) {
          removeClass(body, klass)
        });
      });

      if (_includeRouteName) {
        this._getRouteDepthClasses().forEach((depthClass)=> {
          removeClass(body, depthClass)
        });
      }
    }
  });
}

export default {
  name: 'body-class',
  initialize: initialize
};
