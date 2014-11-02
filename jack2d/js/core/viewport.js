/**
 * Created by Shaun on 10/29/14.
 */

jack2d('Viewport', ['obj', 'ViewportObject'], function(Obj, ViewportObject) {
  'use strict';

  return function() {
    return Obj.create(ViewportObject)
      .setPositionX(0)
      .setPositionY(0)
      .setWidth(256)
      .setHeight(256);
  };
});