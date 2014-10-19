/**
 * Created by Shaun on 5/25/14.
 */

jack2d('Viewport', ['helper'], function(helper) {
  'use strict';

  function initViewDimensions() {
    return {
      x: 0,
      y: 0,
      width: 128,
      height: 128
    };
  }

  return {
    addLayer: function(layer) {
      if(!this.layers) {
        this.layers = [];
      }
      if(!this.viewDimensions) {
        this.viewDimensions = initViewDimensions();
      }

      this.layers.push({visible: true, layer: layer});
      return this;
    },
    setViewportWidth: function(value) {
      if(!this.viewDimensions) {
        this.viewDimensions = initViewDimensions();
      }
      this.viewDimensions.width = value;
      return this;
    },
    setViewportHeight: function(value) {
      if(!this.viewDimensions) {
        this.viewDimensions = initViewDimensions();
      }
      this.viewDimensions.height = value;
      return this;
    },
    getLayer: function(layerIndex) {
      if(this.layers){
        return this.layers[layerIndex];
      }
      return null;
    },
    hideLayer: function(layerIndex) {
      if(this.layers && this.layers[layerIndex]) {
        this.layers[layerIndex].visible = false;
      }
      return this;
    },
    showLayer: function(layerIndex) {
      if(this.layers && this.layers[layerIndex]) {
        this.layers[layerIndex].visible = true;
      }
      return this;
    },
    getViewDimensions: function() {
      return this.viewDimensions;
    },
    // TODO: Needs a "RequireInit" or something
    setPositionX: function(x) {
      this.setPosition(x, this.viewDimensions.y);
      return this;
    },
    setPositionY: function(y) {
      this.setPosition(this.viewDimensions.x, y);
      return this;
    },
    setPosition: function(x, y) {
      var viewDimensions = (this.viewDimensions) ?
        this.viewDimensions : this.viewDimensions = initViewDimensions();
      viewDimensions.x = x;
      viewDimensions.y = y;
      return this;
    }
  };
});

