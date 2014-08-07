/**
 * Created by Shaun on 8/6/14.
 */

jack2d('Str', [], function() {
  'use strict';

  function uCaseFirst(string) {
    return (string) ? string.charAt(0).toUpperCase() + string.slice(1) : null;
  }

  return {
    uCaseFirst: uCaseFirst
  };
});