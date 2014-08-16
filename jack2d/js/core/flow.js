/**
 * Created by Shaun on 8/10/14.
 */

jack2d('Flow', ['helper', 'obj'], function(Helper, Obj) {
  'use strict';

  function FlowList() {
    this.items = [];
    this.counter = 0;
  }

  FlowList.prototype.set = function(item) {
    this.items[this.counter] = item;
  };

  FlowList.prototype.get = function() {
    return this.items[this.counter];
  };

  FlowList.prototype.next = function() {
    this.counter++;
  };

  FlowList.prototype.count = function() {
    return this.items.length;
  };

  function assertAnd(ands, target) {
    var numAnds, and, i;
    numAnds = ands.length;
    for(i = 0; i < numAnds; i++) {
      and = ands[i];
      if(and.isFunc && !and.value(target[and.prop]) ||
        target[and.prop] !== and.value) {
        return false;
      }
    }
    return true;
  }

  function assertItem(item, target) {
    if((item.isFunc && item.value(target[item.prop])) ||
      target[item.prop] === item.value) {
      return !(item.ands && !assertAnd(item.ands, target));
    }
    return false;
  }

  function setValues(item, target) {
    var sets, setItem, numValues, i;
    sets = item.sets;
    numValues = sets.length;

    for(i = 0; i < numValues; i++) {
      setItem = sets[i];
      target[setItem.prop] = setItem.value;
    }
  }

  function runCalls(item, target) {
    var calls, callItem, numCalls, i;
    calls = item.calls;
    numCalls = calls.length;

    for(i = 0; i < numCalls; i++) {
      callItem = calls[i];
      target[callItem.func].apply(target, callItem.args);
    }
  }

  function update(target, flowList) {
    var numItems, item, i;
    numItems = flowList.count();

    for(i = 0; i < numItems; i++) {
      item = flowList.items[i];
      if(assertItem(item, target)) {
        if(item.sets) {
          setValues(item, target);
        }
        if(item.calls) {
          runCalls(item, target);
        }
      }
    }
  }

  return Obj.mixin(['chronoObject', {
    when: function(prop, value) {
      if(!Helper.isDefined(value)) {
        value = true;
      }
      if(!this.flowList) {
        this.flowList = new FlowList();
        this.onFrame(function() {
          update(this, this.flowList);
        });
      } else {
        this.flowList.next();
      }
      this.flowList.set({prop: prop, value: value, isFunc: Helper.isFunction(value)});
      return this;
    },
    whenNot: function(prop) {
      return this.when(prop, false);
    },
    and: function(prop, value) {
      if(!Helper.isDefined(value)) {
        value = true;
      }
      var ands = this.flowList.get().ands;
      if(!ands) {
        this.flowList.get().ands = ands = [];
      }
      ands.push({prop: prop, value: value, isFunc: Helper.isFunction(value)});
      return this;
    },
    andNot: function(prop) {
      return this.and(prop, false);
    },
    set: function(prop, value) {
      var sets = this.flowList.get().sets;
      if(!sets) {
        this.flowList.get().sets = sets = [];
      }
      sets.push({prop: prop, value: value});
      return this;
    },
    // FIXME: call and set should be combined in the flow list so they can
    // all execute in the order that they're defined.
    call: function(func) {
      var args = Array.prototype.slice.call(arguments, 1),
        calls = this.flowList.get().calls;
      if(!calls) {
        this.flowList.get().calls = calls = [];
      }
      calls.push({func: func, args: args});
      return this;
    }
  }]);
});