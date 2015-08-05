Ember.Route.reopen({
  bodyClass: "",

  activate: function() {
    Ember.$('body').addClass(this.get('bodyClass'));
  },

  deactivate: function() {
    Ember.$('body').removeClass(this.get('bodyClass'));
  }
})
