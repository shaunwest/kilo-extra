/**
 * Created by Shaun on 7/16/14.
 */

jack2d('math', [], function() {
  'use strict';

  function containsRect(inner, outer) {
    return !(inner.left < outer.left ||
      inner.right > outer.right ||
      inner.top < outer.top ||
      inner.bottom > outer.bottom);
  }

  return {
    containsRect: containsRect
  };
});