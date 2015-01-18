(function() {
  'use strict';

  if(typeof exports === 'object' && typeof require === 'function') {
    var kilo = require('kilo');
    if(kilo) {
      exports.use = kilo.use;
      exports.register = kilo.register;
    }
  }
})();