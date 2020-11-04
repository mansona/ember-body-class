/* eslint-disable ember/no-get, ember/no-observers */
import { on } from '@ember/object/evented';
import { observer, set } from '@ember/object';
import Route from '@ember/routing/route';
import { getOwner } from '@ember/application';
import { addClass, removeClass } from '../util/bodyClass';
import config from 'ember-get-config';

export function initialize() {
  // Default to true when not set
  let _includeRouteName = true;
  if (config['ember-body-class'] && config['ember-body-class'].includeRouteName === false) {
    _includeRouteName = false;
  }

  Route.reopen({
    classNames: [],
    bodyClasses: null,

    init() {
      this._super(...arguments);

      set(this, 'bodyClasses', []);
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
