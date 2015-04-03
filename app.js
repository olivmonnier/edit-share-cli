#!/usr/bin/env node

var path = require('path'),
  fs = require('fs'),
  express = require('express'),
  app = express(),
  server = require('http').Server(app),
  io = require('socket.io')(server),
  bodyParser = require('body-parser'),
  config = require('./config.js'),
  format = require('./find-format.js'),
  pkg = require(path.join(__dirname, 'package.json')),
  program = require('commander'),
  open = require("open");

program
  .version(pkg.version)
  .usage('[options] <file ...>')
  .option('-p, --port <port>', 'Port on which to listen to (defaults to 3000)',
    parseInt)
  .option('-r, --read', 'ace editor readonly enable')
  .parse(process.argv);

var port = program.port || 3000;

var filepath = process.argv[2],
  readOnly = false,
  datas = {};

if (program.read) readOnly = true;

datas = {
  file: {
    name: path.basename(filepath),
    format: format(filepath),
    content: fs.readFileSync(filepath, 'UTF-8'),
  },
  editor: {
    readonly: readOnly,
    cursor: {
      row: 1,
      column: 1
    }
  }
};

app.use(express.static(path.join(__dirname, '/frontend')));
app.set('views', __dirname + config().frontend_path);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res) {
  res.render('index', {
    datas: datas
  });
});

app.post('/save', function(req, res) {
  var content = req.body.datas;
  fs.writeFileSync(filepath, content, "UTF-8");
  console.log('Log: Save successfull (' + path.basename(filepath) + ')');
});

io.on('connection', function(socket) {
  socket.on("docOnChange", function(doc) {
    datas.file.content = doc.content;
    datas.editor.cursor = doc.cursor;
    socket.broadcast.emit('docChange', datas);
  });
});

server.listen(port);

console.log('Edit share is running on port ' + port);

open('http://127.0.0.1:' + port);
