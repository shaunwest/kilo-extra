/**
 * Created by Shaun on 7/8/14.
 */

jack2d('colliderObject', [], function() {
  'use strict';

  return {
    onBoundaryCollision: function(callback) {
      this.boundaryCollisionCallback = callback;
      return this;
    },
    onObjectXCollision: function(callback) {
      this.objectXCollisionCallback = callback;
      return this;
    },
    onObjectYCollision: function(callback) {
      this.objectYCollisionCallback = callback;
      return this;
    },
    onCollisionsDone: function(callback) {
      this.collisionsDoneCallback = callback;
      return this;
    },
    moveX: function(deltaX) {
      this.moveDeltaX = deltaX;
    },
    moveY: function(deltaY) {
      this.moveDeltaY = deltaY;
    }
  };
});