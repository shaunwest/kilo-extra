use(['Injector', 'Util'], function(Injector, Util) {
  Injector.process = function(deps, cb) {
    var i, numDeps, obj;
    if(Util.isArray(deps)) {
      for(i = 0, numDeps = deps.length; i < numDeps; i++) {
        obj = deps[i]; 
        if(Util.isString(obj)) {
          this.getDependency(obj, function(obj) {
            cb(obj);
          });
        } else {
          cb(obj);
        }
      }
    } else {
      if(Util.isString(deps)) {
        this.getDependency(deps, function(deps) {
          cb(deps);
        });
      } else {
        cb(deps);
      }
    }
  }
});
