'use strict';

module.exports = {
  name: require('./package').name,
  included: function(app) {
    this._super.included.apply(this, app);
  }
};
