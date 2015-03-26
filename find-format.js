var fs = require('fs'),
  path = require('path');

module.exports = function(filename) {
  var extension = path.extname(filename).slice(1),
    formats = fs.readFileSync('formats.json', 'UTF-8'),
    ext = '';

  (extension) ? ext = extension: ext = filename.slice(1);

  var formatsJson = JSON.parse(formats);
  var formatsList = formatsJson.formats;

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
