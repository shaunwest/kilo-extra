/**
 * Created by Shaun on 6/22/14.
 */

jack2d('grid', ['helper', 'obj', 'chronoObject'], function(helper, obj, chronoObject) {
  'use strict';

  return obj.mixin(chronoObject, {
    __mixin: true,
    setGrid: function(cellSize, gridWidth, gridHeight) {
      this.cellSize = cellSize;
      this.gridWidth = gridWidth;
      this.gridHeight = gridHeight;
      this.gridObjects = [];
      this.onFrame(this.updateObjects);
      return this;
    },
    getNearby: function(sourceGridObj) {
      var gridObjects = this.gridObjects,
        sourceCells = sourceGridObj.cells,
        xMin = sourceCells.xMin,
        xMax = sourceCells.xMax,
        yMin = sourceCells.yMin,
        yMax = sourceCells.yMax,
        gridObjectCount = gridObjects.length,
        targetCells,
        i;

      if(!this.objectsInRange) {
        this.objectsInRange = [];
      }
      this.objectsInRange.length = 0;

      for(i = 0; i < gridObjectCount; i++) {
        if(gridObjects[i] === sourceGridObj) {
          continue;
        }
        targetCells = gridObjects[i].cells;
        if(xMin > targetCells.xMax ||
          xMax < targetCells.xMin ||
          yMin > targetCells.yMax ||
          yMax < targetCells.yMin) {
          continue;
        }
        this.objectsInRange.push(gridObjects[i]);
      }
      return this.objectsInRange;
    },
    addObject: function(gridObj) {
      var validObj = (helper.isObject(gridObj)) ?
            gridObj : helper.error('Jack2d: grid: object required');

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
    updateObject: function(gridObj) {
      var xMin = this.pixelToCell(gridObj.x),
        yMin = this.pixelToCell(gridObj.y),
        xMax = this.pixelToCell(gridObj.x + gridObj.width),
        yMax = this.pixelToCell(gridObj.y + gridObj.height);

      gridObj.cells.xMin = xMin;
      gridObj.cells.yMin = yMin;
      gridObj.cells.xMax = xMax;
      gridObj.cells.yMax = yMax;
      gridObj.cells.outOfBounds = (
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
