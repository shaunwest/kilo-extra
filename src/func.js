/**
 * Created by Shaun on 7/6/14.
 */

register('Func', [], function() {
  'use strict';

  function partial(f) {
    var boundArgs = Array.prototype.slice.call(arguments, 1);
    return function() {
      var defaultArgs = boundArgs.slice();
      for(var i = 0; i < arguments.length; i++) {
        defaultArgs.push(arguments[i]);
      }
      return f.apply(this, defaultArgs);
    };
  }

  function wrap(f, wrapper) {
    return partial(wrapper, f);
  }

  function fastPartial(f) {
    return function() {
      var boundArgs =  Array.prototype.slice.call(arguments);
      var lastIndex = boundArgs.length;
      return function(val) {
        boundArgs[lastIndex] = val;
        return f.apply(this, boundArgs);
      };
    };
  }

  return {
    partial: partial,
    fastPartial: fastPartial,
    wrap: wrap
  };
});