/**
 * Created by Shaun on 7/26/14.
 */

jack2d('transformerObject',
['obj', 'chronoObject', 'pool', 'DoubleArray'],
function(obj, chronoObject, pool, DoubleArray) {
  'use strict';

  return obj.mixin(chronoObject, {
    initTransform: function() {
      this.transforms = new DoubleArray();
      this.onFrame(this.transformUpdate);
      return this;
    },
    transform: function(prop, changePerTick, ticks) {
      var transformData = pool.getObject();
      transformData.prop = prop;
      transformData.changePerTick = changePerTick;
      transformData.targetTicks = ticks;
      transformData.tickCount = 0;
      this.transforms.push(transformData);
      return this;
    },
    transformUpdate: function() {
      var transforms = this.transforms.getCurrent(),
        savedTransforms = this.transforms.swap(),
        transformData;

      while(transformData = transforms.pop()) {
        if(transformData.tickCount < transformData.targetTicks) {
          this[transformData.prop] += transformData.changePerTick;
          transformData.tickCount++;
          savedTransforms.push(transformData);
        } else {
          pool.killObject(transformData);
        }
      }
    }
  });
});