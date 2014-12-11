/**
 * Created by Shaun on 8/3/14.
 */

kilo('Factory', ['Obj', 'Pool'], function(Obj, Pool) {
  'use strict';

  return function(TypeObject) {
    //var newObject = Pool.getObject();
    //return Obj.mixin([TypeObject, newObject]); // FIXME: mixin still auto-creates an empty object
    var newObject = Obj.mixin([TypeObject]);
    return newObject;
  };
});