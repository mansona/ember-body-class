ember-body-class
==============================================================================

[![npm version](https://badge.fury.io/js/ember-body-class.svg)](http://badge.fury.io/js/ember-body-class)
[![Travis CI](https://travis-ci.org/AddJam/ember-body-class.svg)](https://travis-ci.org/AddJam/ember-body-class)


Easily add CSS classes on the `<body>`, including route names as well as loading and error states.
`ember install ember-body-class`

Installation
------------------------------------------------------------------------------

```
ember install ember-body-class
```

Usage
------------------------------------------------------------------------------

### Route name classes

By default, all of your routes will include CSS class names. This works for the
whole hierarchy, so if you have a route nested at `application/dashboard/stats`,
then you'll end up with `application`, `dashboard`, `stats`, `application-dashboard` and `application-dashboard-stats` classes.

To disable this, see _options_ below.

### Loading & Error classes

Adding the `loading` and `error` classes requires you to include a mixin in your
application route. Include it like this:

```js
import Ember from 'ember';
import BodyClassMixin from 'ember-body-class/mixins/body-class';

export default Ember.Route.extend(BodyClassMixin, { });
```

### Custom classes
All routes have a `classNames` attribute of type Array. If you wanted to add a
class `strawberry-jam` to your route, it would look like this:

```js
export default Ember.Route.extend({
  classNames: ["strawberry-jam"]
})
```
## Options

You can disable route name classes being added in your environment.js like this.

```js
ENV['ember-body-class'] = {
  includeRouteName: false
}
```

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
