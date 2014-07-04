/**
 * Created by Shaun on 6/28/14.
 */

jack2d('obj', ['injector', 'helper'], function(injector, helper) {
  'use strict';

  return {
    clone: function(object) {
      var newObject = {};
      for(var prop in object) {
        if(object.hasOwnProperty(prop)) {
          newObject[prop] = object[prop];
        }
      }
      return newObject;
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
    mixin: function(giver, reciever, exceptionOnCollisions) {
      reciever = reciever || {};
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

      function mergeObjects(giver, reciever) {
        giver = giver || {};
        if(giver.__mixin === false) {
          console.log('Jack2d: Can\'t mixin object because it\'s disallowed.');
          return;
        }
        Object.keys(giver).forEach(function(prop) {
          if(!helper.isFunction(giver[prop])) {
            // we don't want to merge state, so
            // only allow functions.
            return;
          } else if(reciever.hasOwnProperty(prop)) {
            if(exceptionOnCollisions) {
              helper.error('Jack2d: Failed to merge mixin. Method \'' +
                prop + '\' caused a name collision.');
            } else {
              console.log('Jack2d: Merged \'' + prop + '\'');
            }
          }
          reciever[prop] = giver[prop];
        });
      }
      return reciever;
    }
  };
});