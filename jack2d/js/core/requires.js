/**
 * Created by Shaun on 9/27/14.
 */

jack2d('Requires', [], function() {
  'use strict';

  function Requires(requiredProps, func) {
    var requiresFunc = function() {
      var i, numValues, requiredProp, context = this;
      for(i = 0, numValues = requiredProps.length; i < numValues; i++) {
        requiredProp = requiredProps[i];
        if(!context[requiredProp]) {
          return context;
        }
      }

      Object.keys(context).forEach(function(prop) {
        if(context[prop] === requiresFunc) {
          context[prop] = func;
        }
      });
      return func.apply(context, arguments);
    };
    return requiresFunc;
  }

  return Requires;
});