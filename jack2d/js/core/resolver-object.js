/**
 * Created by Shaun on 7/13/14.
 */

jack2d('resolverObject', [], function() {
  'use strict';

  return {
    resolveX: function(targetObj, diffX) {
      if(diffX < 0) {
        this.x = targetObj.x - this.width;
      } else if(diffX > 0) {
        this.x = targetObj.x + targetObj.width;
      }
      this.moveDeltaX = 0;
      return this;
    },
    resolveY: function(targetObj, diffY) {
      if(diffY < 0) {
        this.y = targetObj.y - this.height;
      } else if(diffY > 0) {
        this.y = targetObj.y + targetObj.height;
      }
      this.moveDeltaY = 0;
      return this;
    }
  };

});