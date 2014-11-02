/**
 * Created by Shaun on 10/30/14.
 */

jack2d('ImageRenderer', ['helper', 'obj', 'Requires', 'Deferred'], function(Helper, Obj, Requires, Deferred){
  'use strict';

  return Obj.mixin(['Element', {
    elPromise: function(elPromise, elementOrSelector) {
      return elPromise
        .call(this, elementOrSelector)
        .then(function(element) {
          if(element.getContext) {
            this.context2d = element.getContext('2d');
          } else {
            throw new Error('Jack2d: ImageRenderer: Image element required');
          }

          this.onFrame(this.updateRenderer);
        }.bind(this));
    },
    setViewport: function(viewport) {
      this.viewport = viewport;
      return this;
    },
    setImage: Deferred([], 'image', function(image) {
      this.image = image;
      return this;
    }),
    updateRenderer: Requires(['context2d', 'viewport', 'image'], function() {
      var viewport = this.viewport;
      var width = viewport.width;
      var height = viewport.height;

      this.context2d.drawImage(
        this.image,
        viewport.x, viewport.y,
        width, height,
        0, 0,
        width, height);
    })
  }], true);
});
