/**
 * Created by Shaun on 6/8/14.
 */

jack2d('input', ['helper', 'chrono'], function(helper, chrono) {
  'use strict';

  var MAX_SEQUENCE_TIME = 0.5,
    keys = {},
    elements = {},
    inputs = {},
    inputCallbacks = [],
    sequence = [],
    sequenceCallbacks = [],
    timeSinceInput = 0,
    chronoId = 0;

  init();

  function init() {
    if(chronoId) {
      return;
    }

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchend", onTouchEnd);

    chronoId = chrono.register(update);
  }

  function deinit() {
    window.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('keyup', onKeyUp);
    window.removeEventListener("touchstart", onTouchStart);
    window.removeEventListener("touchend", onTouchEnd);

    chrono.unregister(chronoId);
    chronoId = 0;
  }

  function onKeyDown(event) {
    if(keys[event.keyCode]) {
      inputs[keys[event.keyCode]] = true;
    }
  }

  function onKeyUp(event) {
    var actionName = keys[event.keyCode];
    if(actionName) {
      inputs[actionName] = false;
      timeSinceInput = 0;
      sequence.push(actionName);
    }
  }

  function onTouchStart(event) {
    var touch = event.touches[0];

    event.preventDefault();

    for(var actionName in elements) {
      if(elements.hasOwnProperty(actionName)) {
        if(touch.target === elements[actionName]) {
          inputs[actionName] = true;
        }
      }
    }
  }

  function onTouchEnd(event) {
    event.preventDefault();

    // FIXME: this cancels ALL touches
    for(var actionName in elements) {
      if(elements.hasOwnProperty(actionName)) {
        inputs[actionName] = false;
      }
    }
  }

  function update(deltaTime) {
    executeInputCallbacks(deltaTime);

    if(timeSinceInput > MAX_SEQUENCE_TIME) {
      publicMethods.flushSequence();
    } else {
      executeSequenceCallbacks();
    }

    timeSinceInput += deltaTime;
  }

  function executeInputCallbacks(deltaTime) {
    var numInputCallbacks = inputCallbacks.length,
      i;

    for(i = 0; i < numInputCallbacks; i++) {
      inputCallbacks[i](inputs, deltaTime);
    }
  }

  function executeSequenceCallbacks() {
    var numSequenceCallbacks = sequenceCallbacks.length,
      i;

    for(i = 0; i < numSequenceCallbacks; i++) {
      executeSequenceCallback(sequenceCallbacks[i]);
    }
  }

  function executeSequenceCallback(sequenceCallback) {
    var targetSequence = sequenceCallback[0],
      callback = sequenceCallback[1],
      sequenceLength = targetSequence.length,
      i;

    for(i = 0; i < sequenceLength; i++) {
      if(targetSequence[i] !== sequence[i]) {
        callback();
      }
    }
  }

  // FIXME: input should have per object state
  // currently, input can be manipulated by any
  // given object that uses the input object
  var publicMethods = {
    setControlScheme: function(scheme) {
      var actionName, action;
      for(actionName in scheme) {
        if(scheme.hasOwnProperty(actionName)) {
          action = scheme[actionName];
          if(action.key) {
            keys[action.key] = actionName;
          }
          if(action.element) {
            elements[actionName] = action.element;
          }
        }
      }
      return this;
    },
    flushSequence: function() {
      sequence.length = 0;
      return this;
    },
    onInput: function(callback) {
      inputCallbacks.push(helper.call(this, callback));
      return this;
    },
    onKeySequence: function(targetSequence, callback) {
      sequenceCallbacks.push([targetSequence, callback]);
      return this;
    },
    getInputs: function() {
      return inputs;
    },
    getSequence: function() {
      return sequence;
    },
    deinit: deinit,
    reinit: init
  };

  return publicMethods;
});
