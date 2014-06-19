/**
 * Created by Shaun on 6/17/14.
 */

jack2d('debug', [], function(){
  'use strict';

  var containerElement,
    contentList = {},
    publicMethods;

  function container(element) {
    containerElement = element;
    containerElement.style.fontFamily = 'courier, sans-serif';
    containerElement.style.position = 'absolute';
    containerElement.style.backgroundColor = 'rgba(0,0,0,0.7)';
    containerElement.style.color = '#ffffff';
    containerElement.style.margin = 0;
    containerElement.style.padding = '10px';
    containerElement.style.zIndex = 99999;
    containerElement.style.border = '2px solid #222222';
    return publicMethods;
  }

  function print(id, message) {
    if(!contentList.hasOwnProperty(id)) {
      containerElement.appendChild(contentList[id] = document.createElement('div'));
    }
    contentList[id].innerHTML = message;
    return publicMethods;
  }

  publicMethods = {
    container: container,
    print: print
  };

  return publicMethods;
});