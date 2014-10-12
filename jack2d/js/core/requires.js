/**
 * Created by Shaun on 9/27/14.
 */

jack2d('Requires', ['obj'], function(Obj) {
  'use strict';

  return function(requiredProps, func) {
    var requiresFunc = function() {
      var i, numValues, requiredProp, context = this;
      for(i = 0, numValues = requiredProps.length; i < numValues; i++) {
        requiredProp = requiredProps[i];
        if(!context[requiredProp]) {
          if(!func._reported) {
            console.log('Jack2d: Requires: \'' + requiredProp + '\' is required.');
            func._reported = true;
          }
          return context; // TODO: is this the appropriate values to return?
        }
      }

      Obj.replaceMethod(
        context,
        requiresFunc,
        func,
        'Jack2d: Requires: \'' + requiredProp + '\' requirement fulfilled.'
      );
      return func.apply(context, arguments);
    };
    return requiresFunc;
  };
});