/**
 * Created by Shaun on 6/22/14.
 */

jack2d('collider', ['helper', 'chrono', 'grid'], function(helper, chrono, grid) {
  'use strict';

  var GRID_CELL_SIZE = 32,
    chronoId = 0,
    worldGrid = helper.create(grid);

  init();

  function init() {
    chronoId = chrono.register(update);
  }

  function deinit() {
    chrono.unRegister(chronoId);
  }

  function update() {

  }

  return {
    setWorldSize: function(width, height) {
      worldGrid.setDimensions(GRID_CELL_SIZE,
        Math.ceil(width / GRID_CELL_SIZE), Math.ceil(height / GRID_CELL_SIZE));
    },
    setBounds: function(width, height) {
      this.width = width;
      this.height = height;
      worldGrid.addObject(this);
    }
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
  };
});