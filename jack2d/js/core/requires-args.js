/**
 * Created by Shaun on 10/4/14.
 */

jack2d('RequiresArgs', ['obj'], function(Obj) {
  'use strict';

  return function(requiredArgs, func) {
    var interceptor = function() {
      var i, numArgs, context = this;
      for(i = 0, numArgs = requiredArgs.length; i < numArgs; i++) {
        if(requiredArgs[i] && !arguments[i]) {
          if(!func._reported) {
            console.log('Jack2d: Requires: argument ' + i + ' is required.');
            func._reported = true;
          }
          return context;
        }
      }

      Obj.replaceMethod(
        context,
        interceptor,
        func,
        'Jack2d: Requires: all argument requirements fulfilled.');
      return func.apply(this, arguments);
    };

    return interceptor;
  };
});