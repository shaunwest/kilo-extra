/**
 * Created by Shaun on 7/4/14.
 */

jack2d('Pool', ['obj'], function(obj) {
  'use strict';

  var objects = [];

  function getObject() {
    var newObject = objects.pop();
    if(!newObject) {
      newObject = addObject();
    }
    return newObject;
  }

  function addObject() {
    var newObject = {};
    objects.push(newObject);
    return newObject;
  }

  function killObject(unusedObject) {
    objects.push(obj.clear(unusedObject));
  }

  return {
    getObject: getObject,
    addObject: addObject,
    killObject: killObject
  };
});