var formats = [
  {
  	format: 'javascript',
  	ext: 'js'
  },
  {
  	format: 'html',
  	ext: 'html'
  },
  {
  	format: 'css',
  	ext: 'css'
  },
  {
    format: 'json',
    ext: 'json'
  },
  {
    format: 'markdown',
    ext: 'md'
  },
  {
    format: 'ruby',
    ext: 'rb'
  },
  {
    format: 'sass',
    ext: 'scss'
  }
];

module.exports = function(extension) {
  var ext = extension.slice(1);

  for(var i = 0; i < formats.length; i++) {
  	if(formats[i].ext == ext) {
  	  return formats[i].format;
  	}
  }
}