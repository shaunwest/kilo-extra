/**
 * Created by Shaun on 6/8/14.
 */


// WARNING: drunk code
jack2d('input', ['chrono'], function(chrono) {
  'use strict';

  var MAX_SEQUENCE_TIME = 0.5,
    keys = {},
    elements = {},
    inputs = {},
    inputCallbacks = [],
    sequence = [],
    sequenceCallbacks = [],
    timeSinceInput = 0;

  init();

  function init() {
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchend", onTouchEnd);

    chrono.register(update);
  }

  function setScheme(scheme) {
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
    return publicMethods;
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

  function flushSequence() {
    sequence.length = 0;
    return publicMethods;
  }

  function update(deltaTime) {
    executeInputCallbacks(deltaTime);

    if(timeSinceInput > MAX_SEQUENCE_TIME) {
      flushSequence();
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

  var publicMethods = {
    setScheme: setScheme,
    onInput: function(callback) {
      inputCallbacks.push(callback);
      return publicMethods;
    },
    onKeySequence: function(targetSequence, callback) {
      sequenceCallbacks.push([targetSequence, callback]);
      return publicMethods;
    }
  };

  return publicMethods;
});
