/**
 * Created by Shaun on 7/4/14.
 */

register('Pool', [], function() {
  'use strict';

  var objects = [];

  function getObject() {
    var newObject = objects.pop();
    if(!newObject) {
      newObject = {};
    }
    return newObject;
  }

  // FIXME: replace with Obj.clear()
  function clearObject(obj) {
    var prop;
    for(prop in obj) {
      if(obj.hasOwnProperty(prop)) {
        delete obj[prop];
      }
    }
    return obj;
  }

  function killObject(unusedObject) {
    objects.push(clearObject(unusedObject));
  }

  function available() {
    return objects.length;
  }

  return {
    getObject: getObject,
    killObject: killObject,
    available: available
  };
});