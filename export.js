var kilo, use, register, CommonJS = false;
if(typeof exports === 'object' && typeof require === 'function') {
  kilo = require('kilo');
  if(kilo) {
    use = kilo.use;
    register = kilo.register;
    CommonJS = true;
  }
}
