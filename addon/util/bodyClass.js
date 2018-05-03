export function addClass(element, klass) {
  if(typeof FastBoot === 'undefined') {
    element.classList.add(klass);
  } else {
    let existingClass = element.getAttribute('class')
    element.setAttribute('class', `${existingClass} ${klass}`);
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
