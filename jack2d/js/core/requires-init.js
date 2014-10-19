/**
 * Created by Shaun on 9/27/14.
 */

jack2d('RequiresInit', ['obj'], function(Obj) {
  'use strict';

  return function(requiredProps, initFunc, func) {
    var requiresFunc = function() {
      var i, numValues, requiredProp, context = this;
      for(i = 0, numValues = requiredProps.length; i < numValues; i++) {
        requiredProp = requiredProps[i];
        if(!context[requiredProp]) {
          initFunc.call(context, context);
          return context;
        }
      }

      Obj.replaceMethod(
        context,
        requiresFunc,
        func,
        'Jack2d: RequiresInit: requirements fulfilled.'
      );
      return func.apply(context, arguments);
    };
    return requiresFunc;
  };
});