/**
 * Created by Shaun on 6/22/14.
 */

jack2d('grid', [helper], function(helper) {
  'use strict';

  function createGrid(gridWidth, gridHeight) {
    var grid = [],
      cx, cy;

    if(!gridWidth || !gridHeight) {
      helper.error('Grid width and height must be defined and non-zero');
    }

    for(cx = 0; cx < gridWidth; cx++) {
      grid[cx] = [];
      for(cy = 0; cy < gridHeight; cy++) {
        grid[cx][cy] = [];
      }
    }
    return grid;
  }

  function updateGrid(grid, gridWidth, gridHeight) {
    var cx, cy, k, objects, obj;
    for(cx = 0; cx < gridWidth; cx++) {
      for(cy = 0; cy < gridHeight; cy++) {
        objects = grid[cx][cy];
        while(obj = objects.pop()) {
        }
      }
    }
  }

  function add(grid, cellSize, obj) {

  }

  return {
    __mixin: false,
    setDimensions: function(cellSize, gridWidth, gridHeight) {
      this.cellSize = cellSize;
      this.gridWidth = gridWidth;
      this.gridHeight = gridHeight;
      this.grid = createGrid(gridWidth, gridHeight);
    },
    addObject: function(obj) {
      var validObj = (helper.isObject(obj)) ?
          obj :  helper.error('Jack2d: grid: object required'),
        cx = this.pixelToCell(validObj.x),
        cy = this.pixelToCell(validObj.y),
        cWidth = this.pixelToCell(validObj.width),
        cHeight = this.pixelToCell(validObj.height);

      if(cx < this.gridWidth && cy < this.gridHeight) {
        obj.cx = cx;
        obj.cy = cy;
        obj.cWidth = cWidth;
        obj.cHeight = cHeight;
        this.grid[cx][cy].push(obj);
      }

      return this;
    },
    pixelToCell: function(pixel) {
      return Math.floor(pixel / this.cellSize);
    }
  };
});
