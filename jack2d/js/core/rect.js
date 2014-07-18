/**
 * Created by Shaun on 7/16/14.
 */

jack2d('rect', [], function() {
  'use strict';

  function containsRect(inner, outer) {
    return !(inner.left < outer.left ||
      inner.right > outer.right ||
      inner.top < outer.top ||
      inner.bottom > outer.bottom);
  }

  function containsRectX(inner, outer) {
    var contains = !(inner.left < outer.left || inner.right > outer.right);
    return (contains) ? false : inner.left - outer.left;
  }

  function containsRectY(inner, outer) {
    var contains = !(inner.top < outer.top || inner.bottom > outer.bottom);
    return (contains) ? false : inner.top - outer.top;
  }

  function intersectsRectX(r1, r2) {
    var intersects = !(r2.left >= r1.right || r2.right <= r1.left);
    return (intersects) ? r1.left - r2.left : false;
  }

  function intersectsRectY(r1, r2) {
    var intersects = !(r2.top >= r1.bottom || r2.bottom <= r1.top);
    return (intersects) ? r1.top - r2.top : false;
  }

  return {
    containsRect: containsRect,
    containsRectX: containsRectX,
    containsRectY: containsRectY,
    intersectsRectX: intersectsRectX,
    intersectsRectY: intersectsRectY
  };
});