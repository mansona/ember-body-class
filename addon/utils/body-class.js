/**
 * Implements a simple class name addition algorithm.
 * Does not use built-ins to enable working in both FastBoot and older browsers.
 *
 * @method addClass
 * @param {Element} element A DOM element.
 * @param {String} className The className to add to the element.
 * @public
 */
export function addClass(element, className) {
  let existingClass = element.getAttribute('class');

  if (existingClass) {
    let classes = existingClass.split(' ');

    if (~classes.indexOf(className)) {
      return;
    }

    element.setAttribute('class', `${existingClass} ${className}`);
  } else {
    element.setAttribute('class', className);
  }
}

// Hoisted from removeClass, doesn't need to be defined multiple times.
// Identifies the whitespace that should be used for replacement.
function replacer(match, leading, trailing) {
  if (leading && trailing) {
    // We're in the middle of the class string.
    // The portions on either side of us still need space separation.
    return ' ';
  } else {
    return '';
  }
}

/**
 * Implements a simple class name removal algorithm.
 * Does not use built-ins to enable working in both FastBoot and older browsers.
 * Removes all copies of the class name from the element.
 *
 * @method removeClass
 * @param {Element} element A DOM element.
 * @param {String} className The className to add to the element.
 * @public
 */
export function removeClass(element, className) {
  let existingClass = element.getAttribute('class');

  if (existingClass) {
    let classNameRegExp = new RegExp(`(^|\\s+)${className}(?:\\s+${className})*(\\s+|$)`, 'g');
    let newClassName = existingClass.replace(classNameRegExp, replacer);
    element.setAttribute('class', newClassName);
  }
}
