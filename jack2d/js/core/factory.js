/**
 * Created by Shaun on 8/3/14.
 */

jack2d('factory', ['helper', 'obj'], function(helper, obj) {
  'use strict';

  return function(factoryObject, functionOrArray) {
    return function() {
      if(helper.isFunction(functionOrArray)) {
        if(factoryObject.hasOwnProperty(functionOrArray)) {
          factoryObject[functionOrArray]();
        }
      } else if(helper.isArray(functionOrArray)) {
        functionOrArray.forEach(function(functionName) {
          if(factoryObject.hasOwnProperty(functionName)) {
            factoryObject[functionName]();
          }
        });
      }

      return obj.create(factoryObject);
    };
  };
});