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
        this.viewDimensions = initViewDimensions();
        this.layers = [];
      }
      //this.setViewportWidth(Math.max(layer.getLayerWidth(), this.viewDimensions.width));
      //this.setViewportHeight(Math.max(layer.getLayerHeight(), this.viewDimensions.height));
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
    setPosition: function(x, y) {
      var viewDimensions = (this.viewDimensions) ?
        this.viewDimensions : this.viewDimensions = initViewDimensions();
      viewDimensions.x = x;
      viewDimensions.y = y;
      return this;
    }
  };
});

