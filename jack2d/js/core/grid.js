/**
 * Created by Shaun on 6/22/14.
 */

jack2d('grid', ['helper', 'obj', 'chronoObject'], function(helper, obj, chronoObject) {
  'use strict';

  return obj.mixin(chronoObject, {
    __mixin: true,
    setDimensions: function(cellSize, gridWidth, gridHeight) {
      this.cellSize = cellSize;
      this.gridWidth = gridWidth;
      this.gridHeight = gridHeight;
      this.gridObjects = [];
      this.onFrame(this.updateObjects);
      return this;
    },
    getObjects: function(xMin, yMin, xMax, yMax) {
      var gridObjects = this.gridObjects,
        gridObjectCount = gridObjects.length,
        gridObject,
        i;

      if(!this.objectsInRange) {
        this.objectsInRange = [];
      }
      this.objectsInRange.length = 0;

      for(i = 0; i < gridObjectCount; i++) {
        gridObject = gridObjects[i].cells;
        if(xMin > gridObject.xMax ||
          xMax < gridObject.xMin ||
          yMin > gridObject.yMax ||
          yMax < gridObject.yMin) {
          // do nothing
        } else {
          this.objectsInRange.push(gridObject);
        }
      }
      return this.objectsInRange;
    },
    addObject: function(obj) {
      var validObj = (helper.isObject(obj)) ?
            obj : helper.error('Jack2d: grid: object required');

      validObj.cells = {};
      this.gridObjects.push(validObj);
      return this;
    },
    updateObjects: function() {
      var gridObjects = this.gridObjects,
        objectCount = gridObjects.length,
        i;
      for(i = 0; i < objectCount; i++) {
        this.updateObject(gridObjects[i]);
      }
    },
    updateObject: function(obj) {
      var xMin = this.pixelToCell(obj.x),
        yMin = this.pixelToCell(obj.y),
        xMax = xMin + this.pixelToCell(obj.width),
        yMax = yMin + this.pixelToCell(obj.height);

      obj.cells.xMin = xMin;
      obj.cells.yMin = yMin;
      obj.cells.xMax = xMax;
      obj.cells.yMax = yMax;
      obj.cells.outOfBounds = (
        xMin >= this.gridWidth ||
        yMin >= this.gridHeight ||
        xMax < 0 ||
        yMax < 0
      );
    },
    pixelToCell: function(pixel) {
      return Math.floor(pixel / this.cellSize);
    }
  });
});
