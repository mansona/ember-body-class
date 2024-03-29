/* eslint-disable ember/no-classic-classes, prettier/prettier */
import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('test');
  this.route('slow');
  this.route('bad');
});

export default Router;
