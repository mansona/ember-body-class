/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-body-class',
  included: function(app) {
    this._super.included(app);
    app.import('vendor/ember-body-class.js');
  }
};
