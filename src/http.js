/**
 * Created by Shaun on 5/3/14.
 */

register('Http', ['Util'], function(Util) {
  'use strict';

  function parseResponse(contentType, responseText) {
    switch(contentType) {
      case 'application/json':
      case 'application/json; charset=utf-8':
        return JSON.parse(responseText);
      default:
        return responseText;
    }
  }

  function get(url, contentTypeOrOnProgress, onProgress) {
    return new Promise(function(resolve, reject) {
      var req = new XMLHttpRequest();

      if(Util.isFunction(contentTypeOrOnProgress)) {
        onProgress = contentTypeOrOnProgress;
        contentTypeOrOnProgress = null;
      }

      if(onProgress) {
        req.addEventListener('progress', function(event) {
          onProgress(event.loaded, event.total);
        }, false);
      }

      req.onerror = function(event) {
        reject(Util.error('Network error.'));
      };

      req.onload = function() {
        var contentType = contentTypeOrOnProgress || this.getResponseHeader('content-type');

        switch(this.status) {
          case 500:
            reject({statusText: this.statusText, status: this.status});
            break;
          case 404:
            reject({statusText: this.statusText, status: this.status});
            break;
          case 304:
            resolve({data: parseResponse(contentType, this.responseText), status: this.status});
            break;
          default:
            resolve({data: parseResponse(contentType, this.responseText), status: this.status});
        }
      };

      req.open('get', url, true);
      req.send();
    });
  }

  return {
    get: get
  };
});
