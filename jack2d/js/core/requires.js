/**
 * Created by Shaun on 9/27/14.
 */

jack2d('Requires', ['helper'], function(Helper) {
  'use strict';

  function Requires(requiredProps, func) {
    var requiresFunc = function() {
      var i, numValues, requiredProp, context = this;
      for(i = 0, numValues = requiredProps.length; i < numValues; i++) {
        requiredProp = requiredProps[i];
        if(!context[requiredProp]) {
          if(!func._reported) {
            console.log('Jack2d: Requires: \'' + requiredProp + '\' is required.');
            func._reported = true;
          }
          return context;
        }
      }

      Object.keys(context).forEach(function(prop) {
        if(context[prop] === requiresFunc) {
          console.log('Jack2d: Requires: \'' + requiredProp + '\' requirement fulfilled.');
          context[prop] = func;
        }
      });
      return func.apply(context, arguments);
    };
    return requiresFunc;
  }

  return Requires;
});