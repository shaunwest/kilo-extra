/**
 * Created by Shaun on 6/7/14.
 */

jack2d('chronoObject', ['helper', 'chrono'], function(helper, chrono) {
  'use strict';

  return {
    chrono: chrono,
    onFrame: function(func) {
      if(!this.chronoId) {
        this.chronoId = chrono.register(helper.call(this, func));
      }
      return this;
    }
  };
});