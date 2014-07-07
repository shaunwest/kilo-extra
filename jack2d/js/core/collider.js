/**
 * Created by Shaun on 6/22/14.
 */

jack2d('collider', ['helper', 'obj', 'grid'], function(helper, obj, grid) {
  'use strict';

  var GRID_CELL_SIZE = 100;

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

  return obj.mixin(grid, {
    setWorldBounds: function(width, height) {
      this.setGrid(GRID_CELL_SIZE,
        Math.ceil(width / GRID_CELL_SIZE),
        Math.ceil(height / GRID_CELL_SIZE));
      this.collisionBounds = {
        width: width,
        height: height
      };
      //this.objectCollisions = [];
      //this.boundsCollisions = [];

      this.onFrame(this.checkCollisions);
      return this;
    },
    checkCollisions: function() {
      var gridObjects = this.gridObjects,
        numGridObjects = gridObjects.length,
        gridObject, i;

      for(i = 0; i < numGridObjects; i++) {
        gridObject = gridObjects[i];
        if(gridObject.bounds) {
          this.checkBoundsCollisions(gridObject);
          this.checkObjectCollisions(gridObject, this.getNearby(gridObject));
        }
      }
      return this;
    },
    checkObjectCollisions: function(sourceObject, targetObjects) {
      var numTargetObjects = targetObjects.length,
        targetObject, i;

      for(i = 0; i < numTargetObjects; i++) {
        targetObject = targetObjects[i];
        if(targetObject.bounds && intersectRect(sourceObject.bounds, targetObject.bounds)) {
          sourceObject.reportObjectCollision();
          targetObject.reportObjectCollision();
        }
      }
      return this;
    },
    checkBoundsCollisions: function(sourceObject) {
      if(!containsRect(sourceObject.bounds, this.collisionBounds)) {
        sourceObject.reportWorldCollision();
      }
      return this;
    }
    /*setBounds: function(width, height) {
      this.colliderWidth = width;
      this.colliderHeight = height;
      this.addObject(this);
    }*/
    /*setBounds: function(left, top, right, bottom) {
      this.bounds = {
        left: left,
        top: top,
        right: right,
        bottom: bottom
      };
      worldGrid.addObject(this);
    },
    getBoundsLeft: function() {
      return this.x + this.bounds.left;
    },
    getBoundsTop: function() {
      return this.y + this.bounds.top;
    },
    getBoundsRight: function() {
      return this.x + (this.size - this.bounds.right);
    },
    getBoundsBottom: function() {
      return this.y + (this.size - this.bounds.bottom);
    }*/
  });
});