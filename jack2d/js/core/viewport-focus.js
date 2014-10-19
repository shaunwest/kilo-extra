/**
 * Created by Shaun on 10/19/14.
 */

jack2d('ViewportFocus', ['rect', 'obj', 'RequiresInit'], function(Rect, Obj, RequiresInit) {
  'use strict';

  function init(viewportFocus) {
    if(!viewportFocus.focusOffset) {
      viewportFocus.focusOffset = {x: 0, y: 0};
    }

    if(!viewportFocus.lastFocusPosition) {
      viewportFocus.lastFocusPosition = {
        x: viewportFocus.focusObject.x,
        y: viewportFocus.focusObject.y
      };
    }
  }

  function checkFocusRegionX(viewportFocus) {
    var offsetX = viewportFocus.focusObject.x - viewportFocus.viewDimensions.x;
    var focusDeltaX = viewportFocus.getFocusDeltaX();

    if(focusDeltaX > 0) { // going right
      if(Rect.containsX(offsetX + (viewportFocus.focusObject.width || 0), viewportFocus.focusRegion)) {
        viewportFocus.focusOffset.x = offsetX;
      } else {
        viewportFocus.setPositionX(viewportFocus.focusObject.x - viewportFocus.focusOffset.x);
      }
    } else if(focusDeltaX < 0) { // going left
      if(Rect.containsX(offsetX, viewportFocus.focusRegion)) {
        viewportFocus.focusOffset.x = offsetX;
      } else {
        viewportFocus.setPositionX(viewportFocus.focusObject.x - viewportFocus.focusOffset.x);
      }
    }

    viewportFocus.lastFocusPosition.x = viewportFocus.focusObject.x;
  }

  function checkFocusRegionY(viewportFocus) {
    var offsetY = viewportFocus.focusObject.y - viewportFocus.viewDimensions.y;
    var focusDeltaY = viewportFocus.getFocusDeltaY();

    if(focusDeltaY > 0) { // going down
      if(Rect.containsY(offsetY + (viewportFocus.focusObject.height || 0), viewportFocus.focusRegion)) {
        viewportFocus.focusOffset.y = offsetY;
      } else {
        viewportFocus.setPositionY(viewportFocus.focusObject.y - viewportFocus.focusOffset.y);
      }
    } else if(focusDeltaY < 0) { // going up
      if(Rect.containsY(offsetY, viewportFocus.focusRegion)) {
        viewportFocus.focusOffset.y = offsetY;
      } else {
        viewportFocus.setPositionY(viewportFocus.focusObject.y - viewportFocus.focusOffset.y);
      }
    }

    viewportFocus.lastFocusPosition.y = viewportFocus.focusObject.y;
  }

  return {
    getFocusDeltaX: function() {
      return this.focusObject.x - this.lastFocusPosition.x;
    },
    getFocusDeltaY: function() {
      return this.focusObject.y - this.lastFocusPosition.y;
    },
    setFocusRegion: function(left, top, right, bottom) {
      this.focusRegion = Obj.create(Rect)
        .setLeft(left)
        .setTop(top)
        .setRight(right)
        .setBottom(bottom);
      return this;
    },
    setFocus: function(focusObject) {
      this.focusObject = focusObject;
      return this;
    },
    checkFocusRegion: RequiresInit([
      'focusRegion',
      'focusObject',
      'focusOffset',
      'lastFocusPosition'],
      init,
      function() {
        checkFocusRegionX(this);
        checkFocusRegionY(this);

        return this;
      }
    )
  };
});