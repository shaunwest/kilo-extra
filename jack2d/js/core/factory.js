/**
 * Created by Shaun on 8/3/14.
 */

jack2d('Factory', ['helper', 'obj', 'Pool'], function(helper, obj, Pool) {
  'use strict';

  return function(TypeObject) {
    var config = Pool.getObject();
    return obj.mixin([TypeObject, config]);
  };
});