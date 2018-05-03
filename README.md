[![npm version](https://badge.fury.io/js/ember-body-class.svg)](http://badge.fury.io/js/ember-body-class)
[![Travis CI](https://travis-ci.org/AddJam/ember-body-class.svg)](https://travis-ci.org/AddJam/ember-body-class)

# ember-body-class

Easily add CSS classes on the `<body>`, including route names as well as loading and error states.
`ember install ember-body-class`

## Usage

### Route name classes

By default, all of your routes will include CSS class names. This works for the
whole hierarchy, so if you have a route nested at `application/dashboard/stats`,
then you'll end up with `application`, `dashboard`, `stats`, `application-dashboard` and `application-dashboard-stats` classes.

To disable this, see _options_ below.

### Loading & Error classes

Adding the `loading` and `error` classes requires you to include a mixin in your
application route. Include it like this:

```
import Ember from 'ember';
import BodyClassMixin from 'ember-body-class/mixins/body-class';

export default Ember.Route.extend(BodyClassMixin, { });
```

### Custom classes
All routes have a `classNames` attribute of type Array. If you wanted to add a
class `strawberry-jam` to your route, it would look like this:

```
export default Ember.Route.extend({
  classNames: ["strawberry-jam"]
})
```

## Options

You can disable route name classes being added in your environment.js like this.

```
ENV['ember-body-class'] = {
  includeRouteName: false
}
```

## License

The MIT License (MIT)

Copyright (c) 2015

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
