var fs = require('fs');
var open = require('open');

module.exports = function scan(filename) {
  open(filename);
}
