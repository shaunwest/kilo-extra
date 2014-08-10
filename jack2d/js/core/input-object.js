/**
 * Created by Shaun on 8/9/14.
 */

jack2d('InputObject', ['obj', 'input'], function(Obj, Input) {
  'use strict';

  return Obj.mixin(['chronoObject', {
    onInteract: function(onInput) {
      var contextOnInput = onInput.bind(this);

      this.onFrame(function() {
        if(Input.isInput()) {
          contextOnInput(Input.getInputs(), Input.getInputsEnded());
        }
      });
      return this;
    }
  }]);
});