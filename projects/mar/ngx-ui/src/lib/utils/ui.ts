import animateScrollTo from 'animated-scroll-to';

export function scrollToAnimated(element: any, to: any, vOffset = 0, hOffset = 0) {
  animateScrollTo(to, {
    elementToScroll: element,
    maxDuration: 500,
    minDuration: 250,
    verticalOffset: vOffset,
    horizontalOffset: hOffset
  });
}

export function getCurrentScrollArea() {
  if (typeof document === 'undefined') { return null; }
  const scrollArea = document.querySelector('layout-component .c-content');
  const scroll: any = scrollArea || window;
  return scroll;
}

export function scrollToTopCurrentScrollArea() {
  scrollToAnimated(getCurrentScrollArea(), 0);
}

export function scrollToBottomCurrentScrollArea() {
  scrollToAnimated(getCurrentScrollArea(), getCurrentScrollArea()?.scrollHeight);
}
