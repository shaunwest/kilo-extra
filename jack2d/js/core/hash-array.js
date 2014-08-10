/**
 * Created by Shaun on 6/4/14.
 */

jack2d('HashArray', [], function() {
  'use strict';

  function HashArray() {
    this.items = [];
    this.idMap = {};
  }

  function realign(idMap, removedIndex) {
    var id;
    for(id in idMap) {
      if(idMap.hasOwnProperty(id) && idMap[id] > removedIndex) {
        idMap[id]--;
      }
    }
  }

  HashArray.prototype.add = function(id, value) {
    if(this.idMap[id]) {
      this.items[this.idMap[id]] = value;
      return true;
    } else {
      this.items.push(value);
      this.idMap[id] = this.items.length - 1;
      return false;
    }
  };

  HashArray.prototype.get = function(id) {
    return this.items[this.idMap[id]];
  };

  HashArray.prototype.remove = function(id) {
    var index = this.idMap[id];
    this.items.splice(index, 1);
    realign(this.idMap, index);
    delete this.idMap[id];
  };

  HashArray.prototype.removeAll = function() {
    var idMap = this.idMap, id;
    this.items.length = 0;
    for(id in idMap) {
      delete idMap[id];
    }
  };

  HashArray.prototype.size = function() {
    return this.items.length;
  };

  return HashArray;
});