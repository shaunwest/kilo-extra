/**
 * Created by Shaun on 1/10/15.
 */

register('Str', [], function() {
  'use strict';

  function sprintf() {
    var str, replacements;

    str = arguments[0],
    replacements = Array.prototype.slice.call(arguments, 1);

    replacements.forEach(function(replacement) {
      str = str.replace('%%', replacement);
    });

    return str;
  }

  return {
    sprintf: sprintf
  };
});