const { format }  = require('timeago.js');
// al ejecutarlo, devuelve una instancia, esa instancia la guardamos en una constante

const helpers = {};

helpers.timeago = (timestamp) => {
  return format(timestamp);
}


module.exports = helpers;
