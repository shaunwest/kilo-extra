var kilo, use, register;
if(typeof exports === 'object' && typeof require === 'function') {
  kilo = require('kilo');
  if(kilo) {
    use = kilo.use;
    register = kilo.register;
  }
}
