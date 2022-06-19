/* eslint-disable prettier/prettier */
export function addClass(element, klass) {
  if(typeof FastBoot === 'undefined') {
    element.classList.add(klass);
  } else {
    let existingClass = element.getAttribute('class') || '';

    if(existingClass) {
      let classes = existingClass.split(' ');

      if(classes.includes(klass)) {
        return
      }

      element.setAttribute('class', `${existingClass} ${klass}`);
    } else {
      element.setAttribute('class', klass);
    }
  }
}

export function removeClass(element, klass) {
  if(typeof FastBoot === 'undefined') {
    element.classList.remove(klass);
  } else {
    let existingClass = element.getAttribute('class')
    element.setAttribute('class', existingClass.replace(klass, ''));
  }
}
