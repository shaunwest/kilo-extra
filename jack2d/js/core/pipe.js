/**
 * Created by Shaun on 8/31/14.
 */

jack2d('Pipe', ['helper', 'Flow'], function(Helper, Flow) {
  'use strict';

  /*function Pipeline(targetObject, previousObject) {
    this.previousObject = previousObject || null;
    this.targetObject = targetObject;
    augmentMethods([], targetObject, this);
  }

  Pipeline.prototype.pipe = function(targetObject) {
    return new Pipeline(targetObject, this.targetObject);
  };*/

  function Pipe(targetObject, previousObject) {
    var pipeObject = {
      previousObject: previousObject || null,
      targetObject: targetObject,
      pipe: function (newTargetObject) {
        return Pipe(newTargetObject, targetObject);
      },
      flow: Flow
    };
    augmentMethods([], targetObject, pipeObject);

    return pipeObject;
  }



  function augmentMethods(methodQueue, targetObject, pipelineObject) {
    Object.keys(targetObject).forEach(function(prop) {
      if(!Helper.isFunction(targetObject[prop])) {
        return;
      }
      pipelineObject[prop] = augmentMethod(methodQueue, targetObject[prop], targetObject, pipelineObject.previousObject);
    });
  }

  function augmentMethod(methodQueue, func, context, previousObject) {
    return function() {
      if(methodQueue.length === 0) {
        methodQueue.push({func: func, args: Helper.argsToArray(arguments), context: context});
        executeMethodQueue(methodQueue, previousObject);
      } else {
        methodQueue.push({func: func, args: Helper.argsToArray(arguments), context: context});
      }
      return this;
    };
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
        executeMethodQueue(methodQueue, extraParam); //method.context); //data);
      });
    } else {
      methodQueue.shift();
      executeMethodQueue(methodQueue, extraParam); //method.context);
    }
  }

  //return Pipeline;
  return Pipe;
});
