/**
 * Created by Shaun on 7/2/14.
 */

jack2d('ActionObject', ['input', 'helper'], function(input, helper) {
  'use strict';

  return {
    init: function(init) {
      var keyActions = this.keyActions = [];

      this.inputId = input.onInputUpdate(helper.call(this, onInputUpdate), this.inputId);

      function onInputUpdate(inputs) {
        var numKeyActions = keyActions.length,
          keyAction,
          i;
        for(i = 0; i < numKeyActions; i++) {
          keyAction = keyActions[i];
          if(keyAction.key && inputs[keyAction.key]) {
            keyAction.callback(inputs[keyAction.key]);
          } else if(inputs.interact && inputs.interact.target === keyAction.element) {
            keyAction.callback(inputs.interact);
          }
        }
      }
      return (init) ? init.call(this) : this;
    },
    action: function(actionId, actionConfig, callback) {
      this.keyActions.push({
        id: actionId,
        key: actionConfig.key,
        element: actionConfig.element,
        callback: helper.call(this, callback)
      });
      return this;
    }
  };
});
