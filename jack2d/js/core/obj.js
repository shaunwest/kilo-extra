/**
 * Created by Shaun on 6/28/14.
 */

jack2d('obj', ['Injector', 'Util', 'func', 'Pool'], function(Injector, Util, func, Pool) {
  'use strict';

  function mergeObjects(giver, receiver, allowWrap, exceptionOnCollisions) {
    giver = giver || {};
    if(giver.__mixin === false) { // This should be fatal. Also, what about receiver?
      Util.error('Can\'t mixin object because the object has disallowed it.');
      return;
    }
    Object.keys(giver).forEach(function(prop) {
      /*if(!helper.isFunction(giver[prop])) {
        // we don't want to merge state, so
        // only allow functions.
        return;
      }*/
      if(receiver.hasOwnProperty(prop)) {
        if(allowWrap) {
          receiver[prop] = func.wrap(receiver[prop], giver[prop]);
          Util.log('Mixin: wrapped \'' + prop + '\'');
        } else if(exceptionOnCollisions) {
          Util.error('Failed to merge mixin. Method \'' +
            prop + '\' caused a name collision.');
        } else {
          receiver[prop] = giver[prop];
          Util.log('Mixin: overwrote \'' + prop + '\'');
        }
      } else {
        receiver[prop] = giver[prop];
      }
    });
  }

  function augmentMethods(targetObject, augmenter) {
    var newObject = {}; // TODO: use pooling?

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

  return {
    replaceMethod: function(context, oldMethod, newMethod, message) {
      Object.keys(context).forEach(function(prop) {
        if(context[prop] === oldMethod) {
          console.log(message);
          context[prop] = newMethod;
        }
      });
    },
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
        if(obj.hasOwnProperty(prop) && !Util.isFunction(obj[prop])) {
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
    extend: function() {
      var args = (arguments.length > 1) ?
        Util.argsToArray(arguments) :
        arguments[0];
      return this.mixin(args, true);
    },
    // TODO: make this work with functions
    // TODO: should it always create a new object? Should be able to mix into existing object
    mixin: function(giver, allowWrap, exceptionOnCollisions) {
      var receiver = Pool.getObject();
      if(Util.isArray(giver)) {
        giver.forEach(function(obj) {
          if(Util.isString(obj)) {
            obj = Injector.getDependency(obj);
          }
          mergeObjects(obj, receiver, allowWrap, exceptionOnCollisions);
        });
      } else {
        if(Util.isString(giver)) {
          giver = Injector.getDependency(giver);
        }
        mergeObjects(giver, receiver, allowWrap, exceptionOnCollisions);
      }

      return receiver;
    }
  };
});