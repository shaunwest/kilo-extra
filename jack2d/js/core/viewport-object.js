/**
 * Created by Shaun on 5/25/14.
 */

jack2d('ViewportObject', ['chrono', 'Construct'], function(Chrono, Construct) {
  'use strict';

  /*function calculateViewDeltaX(context, newX) {
    var deltaX = newX - context.x;
    if(deltaX) {
      context.width = Math.abs(deltaX);
      if(deltaX < 0) {
        context.deltaX += deltaX;
      } else if(deltaX > 0) {
        context.deltaX = context.width;
      }
    }
  }*/

  function init(context) {
    Chrono.register(function() {
      context.deltaX = context.x - context.lastX || 0;
      context.deltaY = context.y - context.lastY || 0;
      context.lastX = context.x;
      context.lastY = context.y;

      console.log(context.deltaX);
    });
  }

  return function() {
    return {
      x: 32,
      y: 32,
      width: 64,
      height: 64
    };
  };


  /*return Construct(init, {
    x: 32,
    y: 32,
    width: 64,
    height: 64,
    getDeltaX: function() {
      return this.deltaX;
    },
    getDeltaY: function() {
      return this.deltaY;
    }*/
    /*setWidth: function(width) {
      this.width = width;
      return this;
    },
    setHeight: function(height) {
      this.height = height;
      return this;
    },
    setPositionX: function(x) {
      this.setPosition(x, this.y);
      return this;
    },
    setPositionY: function(y) {
      this.setPosition(this.x, y);
      return this;
    },
    setPosition: function(x, y) {
      //this.deltaX = x - this.x;
      //this.deltaY = y - this.y;
      this.x = x;
      this.y = y;
      return this;
    }*/
  //});
});

