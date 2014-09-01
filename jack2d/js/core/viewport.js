/**
 * Created by Shaun on 5/25/14.
 */

jack2d('Viewport', ['helper'], function(helper) {
  'use strict';

  function init(targetObject) {
    if(targetObject.layers) {
      return;
    }
    targetObject.contentWidth = 128;
    targetObject.contentHeight = 128;
    targetObject.position = {x: 0, y: 0};
    targetObject.layers = [];
  }

  return {
    /*viewport: function() {
      this.contentWidth = 128;
      this.contentHeight = 128;
      this.position = {x: 0, y: 0};
      this.layers = [];
      return this;
    },*/
    addLayer: function(layer) {
      init(this);
      this.contentWidth = Math.max(layer.getPixelWidth(), this.contentWidth);
      this.contentHeight = Math.max(layer.getPixelHeight(), this.contentHeight);
      //this.setCanvasSize();
      this.layers.push({visible: true, layer: layer});
      return this;
    },
    getLayer: function(layerIndex) {
      return this.layers[layerIndex];
    },
    hideLayer: function(layerIndex) {
      this.layers[layerIndex].visible = false;
      return this;
    },
    showLayer: function(layerIndex) {
      this.layers[layerIndex].visible = true;
      return this;
    },
    getPosition: function() {
      return this.position;
    },
    setPosition: function(x, y) {
      this.position.x = x;
      this.position.y = y;
      //this.canvas.style.left = -x + 'px';
      //this.canvas.style.top = -y + 'px';
      return this;
    }
  };
});

