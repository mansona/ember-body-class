import { addClass, removeClass } from 'ember-body-class/utils/body-class';
import { module, test } from 'qunit';

// Returns the minimal implementation expected by the body-class util.
function elementMock(testCase) {
  return {
    className: testCase.original,

    // YAGNI: making attributeName useful.
    getAttribute(/* attributeName */) {
      return this.className;
    },

    setAttribute(attributeName, value) {
      this.className = value;
    }
  }
}

module('Unit | Utility | bodyClass', function() {

  test('addClass', function(assert) {
    let testCases = [
      {
        original: null,
        input: 'first',
        expected: 'first',
        description: 'Adds a class to a vanilla element.'
      },
      {
        original: '',
        input: 'first',
        expected: 'first',
        description: 'Adds a class to an element with an empty attribute.'
      },
      {
        original: 'first',
        input: 'first',
        expected: 'first',
        description: 'Does not duplicate added classes.'
      },
      {
        original: '  first  ',
        input: 'first',
        expected: '  first  ',
        description: 'Does not duplicate added classes when the original is a bit stranger.'
      },
      {
        original: 'first',
        input: 'second',
        expected: 'first second',
        description: 'Adds a class.'
      },
      {
        original: 'first second',
        input: 'second',
        expected: 'first second',
        description: 'Does not duplicate a second class.'
      },
      {
        original: '0',
        input: 'type',
        expected: '0 type',
        description: 'Watch out for type coercion.'
      }
    ];

    testCases.forEach((testCase) => {
      const element = elementMock(testCase);
      addClass(element, testCase.input);
      assert.strictEqual(
        element.getAttribute('class'),
        testCase.expected,
        testCase.description
      );
    });
  });

  test('removeClass', function(assert) {
    let testCases = [
      {
        original: null,
        input: 'first',
        expected: null,
        description: 'Does not add an empty attribute to a vanilla element.'
      },
      {
        original: '',
        input: 'first',
        expected: '',
        description: 'Does not mutate an an empty attribute.'
      },
      {
        original: 'first',
        input: 'first',
        expected: '',
        description: 'Removes the className from the list.'
      },
      {
        original: ' first',
        input: 'first',
        expected: '',
        description: 'Removes the className from the list with a leading space.'
      },
      {
        original: 'first ',
        input: 'first',
        expected: '',
        description: 'Removes the className from the list with a trailing space.'
      },
      {
        original: ' first ',
        input: 'first',
        expected: ' ', // This is a "garbage-in" situation. The regex doesn't know where it is in the string so it must leave a space.
        description: 'Removes the className from the list with a leading & trailing space.'
      },
      {
        original: 'first second',
        input: 'first',
        expected: 'second',
        description: 'Removes the className from the list.'
      },
      {
        original: 'first second',
        input: 'second',
        expected: 'first',
        description: 'Removes the className from the list.'
      },
      {
        original: 'first second third',
        input: 'second',
        expected: 'first third',
        description: 'Removes the className from the list.'
      },
      {
        original: 'first alsofirst firstagain',
        input: 'first',
        expected: 'alsofirst firstagain',
        description: 'Does not remove portions of class names.'
      },
      {
        original: 'first      second third',
        input: 'second',
        expected: 'first third',
        description: 'Collapses whitespace.'
      },
      {
        original: 'first second first',
        input: 'first',
        expected: 'second',
        description: 'Removes all instances of the class name.'
      },
      {
        original: 'first first',
        input: 'first',
        expected: '',
        description: 'Removes adjacent instances of the class name.'
      }
    ];

    testCases.forEach((testCase) => {
      const element = elementMock(testCase);
      removeClass(element, testCase.input);
      assert.strictEqual(
        element.getAttribute('class'),
        testCase.expected,
        testCase.description
      );
    });
  });
});
