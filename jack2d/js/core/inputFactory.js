/**
 * Created by Shaun on 6/14/14.
 */

jack2d('inputFactory', ['helper', 'input'], function(helper, input) {
  'use strict';

  return function(inputScheme) {
    return helper.clone(input).setScheme(inputScheme);
  };
});