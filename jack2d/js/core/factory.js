/**
 * Created by Shaun on 8/3/14.
 */

jack2d('Factory', ['obj', 'Pool'], function(Obj, Pool) {
  'use strict';

  return function(TypeObject) {
    //var newObject = Pool.getObject();
    //return Obj.mixin([TypeObject, newObject]); // FIXME: mixin still auto-creates an empty object
    return Obj.mixin([TypeObject]);
  };
});