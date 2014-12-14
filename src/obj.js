/**
 * Created by Shaun on 6/28/14.
 */

kilo('Obj', ['Injector', 'Util', 'Func', 'Pool'], function(Injector, Util, Func, Pool) {
  'use strict';

  function mergeObject(source, destination, allowWrap, exceptionOnCollisions) {
    source = source || Pool.getObject();
    destination = destination || Pool.getObject();

    Object.keys(source).forEach(function(prop) {
      assignProperty(source, destination, prop, allowWrap, exceptionOnCollisions);
    });

    return destination;
  }

  function assignProperty(source, destination, prop, allowWrap, exceptionOnCollisions) {
    if(destination.hasOwnProperty(prop)) {
      if(allowWrap) {
        destination[prop] = Func.wrap(destination[prop], source[prop]);
        Util.log('Merge: wrapped \'' + prop + '\'');
      } else if(exceptionOnCollisions) {
        Util.error('Failed to merge mixin. Method \'' +
          prop + '\' caused a name collision.');
      } else {
        destination[prop] = source[prop];
        Util.log('Merge: overwrote \'' + prop + '\'');
      }
    } else {
      destination[prop] = source[prop];
    }

    return destination;
  }

  function augmentMethods(targetObject, augmenter) {
    var newObject = {}; // FIXME: use pooling?

    Object.keys(targetObject).forEach(function(prop) {
      if(!Util.isFunction(targetObject[prop])) {
        return;
      }
      newObject[prop] = augmentMethod(targetObject[prop], targetObject, augmenter);
    });

    return newObject;
  }

  function augmentMethod(method, context, augmenter) {
    return function() {
      var args = Util.argsToArray(arguments);
      if(augmenter) {
        args.unshift(method);
        return augmenter.apply(context, args);
      } else {
        return method.apply(context, args);
      }
    };
  }

  // FIXME: use Injector.process()
  function processDependencies(deps, onProcessed) {
    if(Util.isArray(deps)) {
      deps.forEach(function(obj) {
        if(Util.isString(obj)) {
          obj = Injector.getDependency(obj);
        }
        onProcessed(obj);
      });
    } else {
      if(Util.isString(deps)) {
        deps = Injector.getDependency(deps);
      }
      onProcessed(deps);
    }
  }

  function replaceMethod(context, oldMethod, newMethod, message) {
    Object.keys(context).forEach(function(prop) {
      if(context[prop] === oldMethod) {
        context[prop] = newMethod;
      }
    });
  }

  function augment(obj, augmenter) {
    return augmentMethods(obj, augmenter);
  }

  function quickClone(obj) {
    return quickMerge(obj);
  }

  function quickMerge(source, destination) {
    var prop;
    destination = destination || Pool.getObject();
    for(prop in source) {
      if(source.hasOwnProperty(prop)) {
        destination[prop] = source[prop];
      }
    }
    return destination;
  }

  function print(obj) {
    var prop, str = '';
    if(Util.isObject(obj)) {
      for(prop in obj) {
        if(obj.hasOwnProperty(prop) && !Util.isFunction(obj[prop])) {
          str += prop + ': ' + obj[prop] + '<br>';
        }
      }
    }
    return str;
  }

  function clear(obj) {
    var prop;
    for(prop in obj) {
      if(obj.hasOwnProperty(prop)) {
        delete obj[prop];
      }
    }
    return obj;
  }

  function clone(obj) {
    return merge(obj);
  }

  function merge(source, destination, exceptionOnCollisions) {
    processDependencies(source, function(sourceObj) {
      destination = mergeObject(sourceObj, destination, false, exceptionOnCollisions);
    });

    return destination;
  }

  function wrap(source, destination) {
    processDependencies(source, function(sourceObj) {
      destination = mergeObject(sourceObj, destination, true);
    });

    return destination;
  }

  return {
    print: print,
    clear: clear,
    clone: clone,
    quickClone: quickClone,
    merge: merge,
    quickMerge: quickMerge,
    wrap: wrap,
    augment: augment,
    replaceMethod: replaceMethod
  };
});