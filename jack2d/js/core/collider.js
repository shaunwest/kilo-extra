/**
 * Created by Shaun on 6/22/14.
 */

jack2d('collider', ['helper', 'obj', 'grid'], function(helper, obj, grid) {
  'use strict';

  var GRID_CELL_SIZE = 100;

  function intersectsVertical(r1, r2) {
    var intersects = !(r2.left >= r1.right || r2.right <= r1.left);
    return (intersects) ? r1.left - r2.left : false;
  }

  function intersectsHorizontal(r1, r2) {
    var intersects = !(r2.top >= r1.bottom || r2.bottom <= r1.top);
    return (intersects) ? r1.top - r2.top : false;
  }

  function intersectRect(r1, r2) {
    return !(r2.left > r1.right ||
      r2.right < r1.left ||
      r2.top > r1.bottom ||
      r2.bottom < r1.top);
  }

  function containsRect(inner, outer) {
    return !(inner.left < outer.left ||
      inner.right > outer.right ||
      inner.top < outer.top ||
      inner.bottom > outer.bottom);
  }

  function computeBounds(colliderObject) {
    computeHorizontalBounds(colliderObject);
    computeVerticalBounds(colliderObject);
  }

  function computeHorizontalBounds(colliderObject) {
    var bounds = (colliderObject.bounds) ? colliderObject.bounds : colliderObject.bounds = {};
    bounds.left = colliderObject.x + colliderObject.moveDeltaX;
    bounds.right = bounds.left + colliderObject.width;
    return bounds;
  }

  function computeVerticalBounds(colliderObject) {
    var bounds = (colliderObject.bounds) ? colliderObject.bounds : colliderObject.bounds = {};
    bounds.top = colliderObject.y + colliderObject.moveDeltaY;
    bounds.bottom = bounds.top + colliderObject.height;
    return bounds;
  }

  return obj.mixin(grid, {
    setWorldBounds: function(width, height) {
      height = height || width;
      this.setGrid(GRID_CELL_SIZE,
        Math.ceil(width / GRID_CELL_SIZE),
        Math.ceil(height / GRID_CELL_SIZE));
      this.collisionBounds = {
        left: 0,
        top: 0,
        right: width,
        bottom: height
      };
      this.onFrame(this.checkCollisions);
      return this;
    },
    addObject: function(addObject, colliderObject) {
      colliderObject.moveDeltaX = 0;
      colliderObject.moveDeltaY = 0;
      return addObject.call(this, colliderObject);
    },
    checkCollisions: function() {
      var gridObjects = this.gridObjects,
        numGridObjects = gridObjects.length,
        gridObject, i;

      for(i = 0; i < numGridObjects; i++) {
        gridObject = gridObjects[i];

        this.checkBoundsCollisions(gridObject);
        this.checkObjectCollisions(gridObject, this.getNearby(gridObject));

        if(gridObject.collisionsDoneCallback) {
          gridObject.collisionsDoneCallback();
        }
      }

      return this;
    },
    checkObjectCollisions: function(sourceObject, targetObjects) {
      var numTargetObjects = targetObjects.length,
        diffX, diffY,
        targetObject, i;

      for(i = 0; i < numTargetObjects; i++) {
        targetObject = targetObjects[i];
        computeBounds(targetObject);

        if(sourceObject.moveDeltaX && sourceObject.objectXCollisionCallback) {
          computeHorizontalBounds(sourceObject);
          computeVerticalBounds(sourceObject);
          diffX = intersectsVertical(sourceObject.bounds, targetObject.bounds);
          diffY = intersectsHorizontal(sourceObject.bounds, targetObject.bounds);
          if(diffX !== false && diffY !== false) {
            sourceObject.objectXCollisionCallback(targetObject, diffX, diffY);
          }
        }

        if(sourceObject.moveDeltaY && sourceObject.objectYCollisionCallback) {
          computeHorizontalBounds(sourceObject);
          computeVerticalBounds(sourceObject);
          diffX = intersectsVertical(sourceObject.bounds, targetObject.bounds);
          diffY = intersectsHorizontal(sourceObject.bounds, targetObject.bounds);
          if(diffX !== false && diffY !== false) {
            sourceObject.objectYCollisionCallback(targetObject, diffX, diffY);
          }
        }
      }
      return this;
    },
    checkBoundsCollisions: function(sourceObject) {
      if(sourceObject.boundaryCollisionCallback) {
        computeBounds(sourceObject);
        if(!containsRect(sourceObject.bounds, this.collisionBounds)) {
          sourceObject.boundaryCollisionCallback();
        }
      }
      return this;
    }
  });
});