/**
 * Created by Shaun on 6/17/14.
 */

jack2d('debug', ['helper', 'doc', 'chrono'], function(helper, doc, chrono){
  'use strict';

  var containerElement,
    contentList = {},
    waitQueue = [],
    chronoId = 0,
    publicMethods;

  function targetElement(elementOrSelector) {
    doc.getElement(elementOrSelector).then(function(element){
      element.style.fontFamily = 'courier, sans-serif';
      element.style.position = 'absolute';
      element.style.backgroundColor = 'rgba(0,0,0,0.7)';
      element.style.color = '#ffffff';
      element.style.margin = 0;
      element.style.padding = '10px';
      element.style.zIndex = 99999;
      element.style.border = '2px solid #222222';

      containerElement = element;
      processWaitQueue();
    });
    return this;
    //return publicMethods;
  }

  function processWaitQueue() {
    while(waitQueue.length > 0) {
      containerElement.appendChild(waitQueue.shift());
    }
  }

  function print(id, message) {
    if(!contentList.hasOwnProperty(id)) {
      contentList[id] = document.createElement('div');
      if(containerElement) {
        containerElement.appendChild(contentList[id]);
      } else {
        waitQueue.push(contentList[id]);
      }
    }
    contentList[id].innerHTML = message;

    return this;
  }

  publicMethods = {
    targetElement: targetElement,
    print: print,
    livePrint: function(callback) {
      chronoId = chrono.register(helper.call(this, callback, print), chronoId);
      return this;
    }
  };

  //targetElement.print = publicMethods.print;
  //targetElement.livePrint = publicMethods.livePrint;

  return publicMethods;
  //return targetElement;
});