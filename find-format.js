var fs = require('fs'),
  path = require('path'),
  formats = require('./formats.js')();

module.exports = function(filepath) {
  var filename = path.basename(filepath),
    extension = path.extname(filename).slice(1),
    ext = '';

  (extension) ? ext = extension: ext = filename.slice(1);

  var formatsList = formats.formats;

  for (var i = 0; i < formatsList.length; i++) {
    if (formatsList[i].ext instanceof Array) {
      for (var x = 0; x < formatsList[i].ext.length; x++) {
        if (formatsList[i].ext[x] == ext) {
          return formatsList[i].format;
        }
      }
    } else {
      if (formatsList[i].ext == ext) {
        return formatsList[i].format;
      }
    }
  }

  return "plain_text";
}
