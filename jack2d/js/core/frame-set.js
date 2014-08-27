/**
 * Created by Shaun on 8/24/14.
 */

jack2d('FrameSet', [], function() {
  'use strict';

  function flipSet(frames, width, height) {
    var i, rowCount, flippedFrames;

    rowCount = frames.length;
    flippedFrames = [];

    for(i = 0; i < rowCount; i++) {
      flippedFrames.push(flipSequence(frames[i], width, height));
    }
    return flippedFrames;
  }

  function flipSequence(frames, width, height) {
    var i, frameCount, flippedFrame, context, flippedFrames;

    flippedFrames = [];
    frameCount = frames.length;

    for(i = 0; i < frameCount; i++) {
      flippedFrame = document.createElement('canvas');
      flippedFrame.width  = width;
      flippedFrame.height = height;

      context = flippedFrame.getContext('2d');
      context.translate(width, 0);
      context.scale(-1, 1);

      context.drawImage(
        frames[i],
        0, 0,
        width, height,
        0, 0,
        width, height
      );

      flippedFrames.push(flippedFrame);
    }

    return flippedFrames;
  }

  function FrameSet(frames, width, height) {
    this.frames = frames;
    this.framesFH = flipSet(this.frames, width, height);
    this.framesFV = null; // TODO...
  }

  FrameSet.prototype.getFrames = function(flipped) {
    switch(flipped) {
      case FrameSet.FLIP_HORIZONTAL:
        return this.framesFH;
      case FrameSet.FLIP_VERTICAL:
        return this.framesFV;
      default:
        return this.frames;
    }
  };

  FrameSet.prototype.getFrameSequence = function(index, flippedH, flippedV) {
    return this.getFrames(flippedH, flippedV)[index];
  };

  FrameSet.FLIP_NONE = 0;
  FrameSet.FLIP_HORIZONTAL = 1;
  FrameSet.FLIP_VERTICAL = 2;

  return FrameSet;
});