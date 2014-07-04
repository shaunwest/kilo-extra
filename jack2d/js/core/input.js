/**
 * Created by Shaun on 6/8/14.
 */

jack2d('input', ['helper', 'chrono', 'KeyStore'], function(helper, chrono, KeyStore) {
  'use strict';

  var MODE_TOUCH = 'touch',
    MODE_MOUSE = 'mouse',
    INTERACT_ID = 'interact',
    MAX_SEQUENCE_TIME = 0.5,
    inputs,
    sequence,
    timeSinceInput,
    inputUpdateCallbacks,
    sequenceCallbacks,
    mode,
    inputReleased,
    interactStart,
    interactEnd,
    chronoId;

  init();

  function init() {
    inputs = {};
    sequence = [];
    timeSinceInput = 0;
    inputUpdateCallbacks = new KeyStore();
    sequenceCallbacks = new KeyStore();
    mode = MODE_MOUSE;
    inputReleased = false;
    /*interactStart = 'touchstart';
     interactEnd = 'touchend';*/
    interactStart = 'mousedown';
    interactEnd = 'mouseup';

    if(chronoId) {
      return;
    }

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener(interactStart, onTouchStart);
    window.addEventListener(interactEnd, onTouchEnd);

    chronoId = chrono.register(update);
  }

  function deinit() {
    window.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('keyup', onKeyUp);
    window.removeEventListener(interactStart, onTouchStart);
    window.removeEventListener(interactEnd, onTouchEnd);

    chrono.unregister(chronoId);
    chronoId = 0;
  }

  // FIXME: there should be an injectable module that says whether we're
  // on mobile or not and set the mode accordingly before init()
  function setMode(value) {
    mode = value;
    deinit();

    if(mode === MODE_TOUCH) {
      interactStart = 'touchstart';
      interactEnd = 'touchend';
    } else {
      interactStart = 'mousedown';
      interactEnd = 'mouseup';
    }

    init();
  }

  function onKeyDown(event) {
    inputs[event.keyCode] = event;
  }

  function onKeyUp(event) {
    var keyCode = event.keyCode;
    delete inputs[keyCode];
    timeSinceInput = 0;
    inputReleased = true;
    sequence.push(keyCode);
  }

  function onTouchStart(event) {
    //var target = (mode === MODE_TOUCH) ? event.touches[0].target : event.target;
    var interaction = (mode === MODE_TOUCH) ? event.touches[0] : event;

    event.preventDefault();
    inputs[INTERACT_ID] = interaction;
  }

  function onTouchEnd(event) {
    event.preventDefault();
    inputReleased = true;
    delete inputs[INTERACT_ID];
  }

  function update(deltaTime) {
    if(timeSinceInput > MAX_SEQUENCE_TIME) {
      flushSequence();
    } else if(sequence.length) {
      executeSequenceCallbacks(deltaTime);
    }

    if(Object.keys(inputs).length || inputReleased) {
      executeInputCallbacks(deltaTime);
      inputReleased = false;
    }
    timeSinceInput += deltaTime;
  }

  function executeInputCallbacks(deltaTime) {
    var items = inputUpdateCallbacks.getItems(),
      numItems = items.length,
      numCallbacks,
      item,
      i, j;

    for(i = 0; i < numItems; i++) {
      item = items[i];
      numCallbacks = item.length;
      for(j = 0; j < numCallbacks; j++) {
        item[j](inputs, deltaTime);
      }
    }
  }

  function executeSequenceCallbacks(deltaTime) {
    var items = sequenceCallbacks.getItems(),
      numItems = items.length,
      numCallbacks,
      item,
      i, j;

    for(i = 0; i < numItems; i++) {
      item = items[i];
      numCallbacks = item.length;
      for(j = 0; j < numCallbacks; j++) {
        item[j](sequence, deltaTime);
      }
    }
  }

  function flushSequence() {
    sequence.length = 0;
  }

  return {
    onInputUpdate: function(callback, id) {
      return inputUpdateCallbacks.setGroup(id, callback);
    },
    cancelOnInputUpdate: function(id) {
      inputUpdateCallbacks.clear(id);
      return this;
    },
    onKeySequence: function(callback, id) {
      return sequenceCallbacks.setGroup(id, callback);
    },
    cancelOnKeySequence: function(id) {
      sequenceCallbacks.clear(id);
      return this;
    },
    getInputs: function() {
      return inputs;
    },
    getSequence: function() {
      return sequence;
    },
    flushSequence: function() {
      flushSequence();
      return this;
    },
    deinit: function() {
      deinit();
      return this;
    },
    reinit: function() {
      deinit();
      init();
      return this;
    },
    setMode: setMode,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    INTERACT: INTERACT_ID
  };
});