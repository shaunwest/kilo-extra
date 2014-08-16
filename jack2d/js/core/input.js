/**
 * Created by Shaun on 6/8/14.
 */

jack2d('input', ['helper', 'obj', 'chrono', 'KeyStore'], function(helper, obj, chrono, KeyStore) {
  'use strict';

  var MODE_TOUCH = 'touch',
    MODE_MOUSE = 'mouse',
    INTERACT_ID = 'interact',
    MAX_SEQUENCE_TIME = 0.5,
    inputs,
    inputsEnded,
    sequence,
    timeSinceInput,
    mode,
    lastDeltaTime,
    inputReleased,
    interactStart,
    interactEnd,
    interactMove,
    chronoId;

  init();

  function init() {
    inputs = {};
    inputsEnded = {};
    sequence = [];
    timeSinceInput = 0;
    mode = MODE_MOUSE;
    lastDeltaTime = 0;
    inputReleased = false;
    /*interactStart = 'touchstart';
     interactEnd = 'touchend';*/
    interactStart = 'mousedown';
    interactEnd = 'mouseup';
    interactMove = 'mousemove';

    if(chronoId) {
      return;
    }

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener(interactStart, onTouchStart);
    window.addEventListener(interactEnd, onTouchEnd);
    window.addEventListener(interactMove, onTouchMove);

    chronoId = chrono.register(update);
  }

  function deinit() {
    window.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('keyup', onKeyUp);
    window.removeEventListener(interactStart, onTouchStart);
    window.removeEventListener(interactEnd, onTouchEnd);
    window.removeEventListener(interactMove, onTouchMove);

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
    inputsEnded[keyCode] = event;
    delete inputs[keyCode];
    timeSinceInput = 0;
    sequence.push(keyCode);
  }

  function onTouchStart(event) {
    //var target = (mode === MODE_TOUCH) ? event.touches[0].target : event.target;
    var interaction = (mode === MODE_TOUCH) ? event.touches[0] : event;

    event.preventDefault();
    inputs[INTERACT_ID] = interaction;
  }

  function onTouchMove(event) {
    var interaction = (mode === MODE_TOUCH) ? event.touches[0] : event;
    if(!inputs[INTERACT_ID]) {
      return;
    }
    event.preventDefault();
    inputs[INTERACT_ID] = interaction;
  }

  function onTouchEnd(event) {
    inputsEnded[INTERACT_ID] = inputs[INTERACT_ID];
    delete inputs[INTERACT_ID];
  }

  function update(deltaTime) {
    lastDeltaTime = deltaTime;

    if(timeSinceInput > MAX_SEQUENCE_TIME) {
      flushSequence();
    }

    timeSinceInput += deltaTime;
  }

  function flushSequence() {
    sequence.length = 0;
  }

  function isInput() {
    return (Object.keys(inputs).length);
  }

  return {
    getInputs: function() {
      return inputs;
    },
    getInputsEnded: function() {
      return inputsEnded;
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
    setMode: function(value) {
      setMode(value);
      return this;
    },
    isInput: isInput,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    INTERACT: INTERACT_ID
  };
});