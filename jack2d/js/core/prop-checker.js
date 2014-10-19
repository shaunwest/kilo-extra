/**
 * Created by Shaun on 10/15/14.
 *
 * Experimental, unfinished. Idea is to wrap object track changes to properties over time
 * and potentially find conflicts between mixins.
 * Update: instead, just record which properties are used by the object, then toss out the augmented functions
 */

jack2d('PropChecker', ['helper'], function(Helper) {
  'use strict';

  return function PropChecker(id, obj) {
    function setProps(targetObject) {
      if(!targetObject.__props) {
        targetObject.__props = {};
      }
      if(!targetObject.__props[id]) {
        targetObject.__props[id] = {};
      }
      Object.keys(targetObject).forEach(function(prop) {
        var val = targetObject[prop];
        if(!Helper.isFunction(val)) {
          targetObject.__props[id][prop] = true;
        }
      });
    }

    Object.keys(obj).forEach(function(prop) {
      var val = obj[prop];
      if(Helper.isFunction(val)) {
        obj[prop] = function() {
          var result = val.apply(this, arguments);
          setProps(this);
          this[prop] = val;
          return result;
        };
      }
    });

    return obj;
  };
});
