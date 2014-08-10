/**
 * Created by Shaun on 7/2/14.
 */

jack2d('ActionObject', ['obj', 'input', 'helper'], function(Obj, Input, Helper) {
  'use strict';

  function initActions(keyActions, updateFunc) {
    updateFunc(onInputUpdate);

    function onInputUpdate() {
      var numKeyActions = keyActions.length,
        inputs = Input.getInputs(),
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
  }

  return Obj.mixin(['chronoObject', {
    action: function(actionId, actionConfig, callback) {
      if(!this.keyActions) {
        initActions(this.keyActions = [], Helper.call(this, this.onFrame)); // bind?
      }
      this.keyActions.push({
        id: actionId,
        key: actionConfig.key,
        element: actionConfig.element,
        callback: Helper.call(this, callback)
      });
      return this;
    }
  }]);
});
