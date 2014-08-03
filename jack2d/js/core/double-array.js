/**
 * Created by Shaun on 7/26/14.
 */

jack2d('DoubleArray', [], function() {
  'use strict';

  function DoubleArray() {
    this.array = [[], []];
    this.currentIndex = 0;
  }

  DoubleArray.prototype.push = function(value) {
    this.array[this.currentIndex].push(value);
  };

  DoubleArray.prototype.pop = function() {
    return this.array[this.currentIndex].pop();
  };

  DoubleArray.prototype.getCurrent = function() {
    return this.array[this.currentIndex];
  };

  DoubleArray.prototype.swap = function() {
    this.currentIndex = (this.currentIndex === 1) ? 0 : 1;
    return this.array[this.currentIndex];
  };

  return DoubleArray;
});