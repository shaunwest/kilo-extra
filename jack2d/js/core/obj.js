/**
 * Created by Shaun on 6/28/14.
 */

jack2d('obj', ['injector', 'helper', 'func'], function(injector, helper, func) {
  'use strict';

  return {
    clone: function(object) {
      /*var prop, newObject = {};
      for(prop in object) {
        if(object.hasOwnProperty(prop)) {
          newObject[prop] = object[prop];
        }
      }
      return newObject;*/
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
    },
    mixin: function(giver, reciever, allowWrap, exceptionOnCollisions) {
      reciever = reciever || {};
      allowWrap = helper.def(allowWrap, true);

      if(helper.isArray(giver)) {
        giver.forEach(function(obj) {
          if(helper.isString(obj)) {
            obj = injector.getDependency(obj);
          }
          mergeObjects(obj, reciever);
        });
      } else {
        if(helper.isString(giver)) {
          giver = injector.getDependency(giver);
        }
        mergeObjects(giver, reciever);
      }

      function mergeObjects(giver, receiver) {
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
              receiver[prop] = func.wrap(giver[prop], receiver[prop]);
              console.log('Jack2d: Wrapped \'' + prop + '\'');
            } else if(exceptionOnCollisions) {
              helper.error('Jack2d: Failed to merge mixin. Method \'' +
                prop + '\' caused a name collision.');
            } else {
              receiver[prop] = giver[prop];
              console.log('Jack2d: Merged \'' + prop + '\'');
            }
          } else {
            receiver[prop] = giver[prop];
          }
        });
      }
      return reciever;
    }
  };
});