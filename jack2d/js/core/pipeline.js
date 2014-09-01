/**
 * Created by Shaun on 8/31/14.
 */

jack2d('Pipeline', ['helper', 'injector', 'obj'], function(Helper, Injector, Obj) {
  'use strict';

  function Pipeline() {
    var deps, methodQueue, pipelineObject;
    pipelineObject = this;
    methodQueue = this.methodQueue = [];
    deps = Helper.argsToArray(arguments);
    //this.targetObject = Obj.mixin(Helper.argsToArray(arguments));
    deps.forEach(function(dep) {
      augmentMethods(methodQueue, Obj.clone(Injector.getDependency(dep)), pipelineObject);
    });
  }

  /*Pipeline.prototype.getObject = function() {
    return this.targetObject;
  };*/

  function augmentMethods(methodQueue, targetObject, pipelineObject) {
    Object.keys(targetObject).forEach(function(prop) {
      if(!Helper.isFunction(targetObject[prop])) {
        return;
      }
      //targetObject[prop] = augmentMethod(methodQueue, targetObject[prop]);
      pipelineObject[prop] = augmentMethod(methodQueue, targetObject[prop], targetObject);
    });
  }

  function executeMethodQueue(methodQueue, extraParam) {
    var method, result;

    method = methodQueue[0];
    if(!method) {
      return;
    }

    if(extraParam) {
      method.args.push(extraParam);
    }

    result = method.func.apply(method.context, method.args);

    if(result.then) {
      result.then(function(data) {
        methodQueue.shift();
        executeMethodQueue(methodQueue, method.context); //data);
      });
    } else {
      methodQueue.shift();
      executeMethodQueue(methodQueue, method.context);
    }
  }

  function augmentMethod(methodQueue, func, context) {
    return function() {
      if(methodQueue.length === 0) {
        methodQueue.push({func: func, args: Helper.argsToArray(arguments), context: context});
        executeMethodQueue(methodQueue);
      } else {
        methodQueue.push({func: func, args: Helper.argsToArray(arguments), context: context});
      }
      return this;
    };
  }



  return Pipeline;
});
