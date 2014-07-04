/**
 * Created by Shaun on 7/2/14.
 */

jack2d('actionObject', ['input', 'helper'], function(input, helper) {
  'use strict';

  function createFunction(context, id, triggers, keyActions) {
    return function(callback) {
      keyActions.push({id: id, key: triggers.key, element: triggers.element, callback: callback});
      return context;
    };
  }

  return {
    setActions: function(actions) {
      var keyActions = (this.keyActions) ? this.keyActions : this.keyActions = [],
        id;

      this.actions = {};
      for(id in actions) {
        if(actions.hasOwnProperty(id)) {
          this.actions[id] = createFunction(this.actions, id, actions[id], this.keyActions);
        }
      }

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

      return this;
    }
  };
});
