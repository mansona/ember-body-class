import { on } from '@ember/object/evented';
import { observer } from '@ember/object';
import Route from '@ember/routing/route';
import { getOwner } from '@ember/application';
import { addClass, removeClass } from '../util/bodyClass';

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
    bodyClasses: [],

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
      this._setClassNamesOnBodyElement();
    }),

    _setClassNamesOnBodyElement() {
      const { body } = getOwner(this).lookup('service:-document');
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

    updateClasses: observer('bodyClasses.[]', 'classNames.[]', function() {
      const { body } = getOwner(this).lookup('service:-document');

      ['bodyClasses', 'classNames'].forEach((classes) => {
        this.get(classes).forEach(function(klass) {
          removeClass(body, klass);
        });
      });

      this._setClassNamesOnBodyElement();
    }),

    removeClasses: on('deactivate', function() {
      const { body } = getOwner(this).lookup('service:-document');

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
    }),
  });
}

export default {
  name: 'body-class',
  initialize: initialize
};
