/**
 * Created by Shaun on 6/28/14.
 */

jack2d('obj', ['injector', 'helper', 'func'], function(injector, helper, func) {
  'use strict';

  function mergeObjects(giver, receiver, allowWrap, exceptionOnCollisions) {
    giver = giver || {};
    if(giver.__mixin === false) {
      console.log('Jack2d: Can\'t mixin object because the object has disallowed it.');
      return;
    }
    Object.keys(giver).forEach(function(prop) {
      if(!helper.isFunction(giver[prop])) {
        // we don't want to merge state, so
        // only allow functions.
        return;
      }
      if(receiver.hasOwnProperty(prop)) {
        if(allowWrap) {
          receiver[prop] = func.wrap(receiver[prop], giver[prop]);
          console.log('Jack2d: Mixin: wrapped \'' + prop + '\'');
        } else if(exceptionOnCollisions) {
          helper.error('Jack2d: Failed to merge mixin. Method \'' +
            prop + '\' caused a name collision.');
        } else {
          receiver[prop] = giver[prop];
          console.log('Jack2d: Mixin: overwrote \'' + prop + '\'');
        }
      } else {
        receiver[prop] = giver[prop];
      }
    });
  }

  function augmentMethods(targetObject, augmenter) {
    var newObject = {}; // TODO: use pooling?

    Object.keys(targetObject).forEach(function(prop) {
      if(!helper.isFunction(targetObject[prop])) {
        return;
      }
      newObject[prop] = augmentMethod(targetObject[prop], targetObject, augmenter);
    });

    return newObject;
  }

  function augmentMethod(method, context, augmenter) {
    return function() {
      var args = helper.argsToArray(arguments);
      if(augmenter) {
        args.unshift(method);
        return augmenter.apply(context, args);
      } else {
        return method.apply(context, args);
      }
    };
  }

  return {
    augment: function(object, augmenter) {
      return augmentMethods(object, augmenter);
    },
    clone: function(object) {
      return this.merge(object);
    },
    merge: function(source, destination) {
      var prop;
      destination = destination || {};
      for(prop in source) {
        if(source.hasOwnProperty(prop)) {
          destination[prop] = source[prop];
        }
      }
      return destination;
    },
    create: function(source) {
      return this.mixin(source);
    },
    print: function(obj) {
      var prop, str = '';
      for(prop in obj) {
        if(obj.hasOwnProperty(prop) && !helper.isFunction(obj[prop])) {
          str += prop + ': ' + obj[prop] + '<br>';
        }
      }
      return str;
    },
    clear: function(obj) {
      var prop;
      for(prop in obj) {
        if(obj.hasOwnProperty(prop)) {
          delete obj[prop];
        }
      }
      return obj;
    },
    extend: function(parent) {
      return this.mixin(parent, true);
    },
    mixin: function(giver, allowWrap, exceptionOnCollisions) {
      var receiver = {};
      if(helper.isArray(giver)) {
        giver.forEach(function(obj) {
          if(helper.isString(obj)) {
            obj = injector.getDependency(obj);
          }
          mergeObjects(obj, receiver, allowWrap, exceptionOnCollisions);
        });
      } else {
        if(helper.isString(giver)) {
          giver = injector.getDependency(giver);
        }
        mergeObjects(giver, receiver, allowWrap, exceptionOnCollisions);
      }

      return receiver;
    }
  };
});