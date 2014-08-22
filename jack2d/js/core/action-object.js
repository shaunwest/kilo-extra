/**
 * Created by Shaun on 7/2/14.
 */

jack2d('ActionObject', ['obj', 'input', 'helper'], function(Obj, Input, Helper) {
  'use strict';

  function onInputUpdate(context, keyActions) {
    var numKeyActions,
      inputs,
      keyAction,
      keys = false,
      i;

    numKeyActions = keyActions.length;
    inputs = Input.getInputs();

    for(i = 0; i < numKeyActions; i++) {
      keyAction = keyActions[i];
      if(keyAction.key) {
        if(inputs[keyAction.key]) {
          if(keyAction.callback) {
           keyAction.callback(inputs[keyAction.key]);
          }
          context[keyAction.id] = true;
          keys = true;
        } else {
          context[keyAction.id] = false;
        }
      } else if(keyAction.callback) {
        keyAction.callback(inputs);
      }

      if(inputs.interact &&
        inputs.interact.target === keyAction.element &&
        keyAction.callback) {
        keyAction.callback(inputs.interact);
      }
    }

    context.idle = !keys;
  }

  return Obj.mixin(['chronoObject', {
    actions: function(onFrame) {
      this.keyActions = [];
      this.onFrame(function() {
        this.inputs = Input.getInputs();
        this.inputsEnded = Input.getInputsEnded();
        this.inputSequence = Input.getSequence();
        onInputUpdate(this, this.keyActions);
        if(onFrame) {
          onFrame.call(this);
        }
      }, 'action-object');

      return this;
    },
    action: function(actionId, actionConfigOrCallback, callback) {
      /*if(!this.keyActions) {
        this.keyActions = [];
        this.onFrame(function() {
          this.inputs = Input.getInputs();
          this.inputsEnded = Input.getInputsEnded();
          this.inputSequence = Input.getSequence();
          onInputUpdate(this, this.keyActions);
        }, 'action-object');
      }*/
      if(Helper.isFunction(actionConfigOrCallback)) {
        callback = actionConfigOrCallback;
        actionConfigOrCallback = {};
      }
      this.keyActions.push({
        id: actionId,
        key: actionConfigOrCallback.key,
        element: actionConfigOrCallback.element,
        callback: (callback) ? callback.bind(this) : null
      });
      return this;
    }
  }]);
});
