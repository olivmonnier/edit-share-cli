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
  fileDatas = fs.readFileSync(filepath, 'UTF-8'),
  formatFile = format(filepath);

app.use(express.static(path.join(__dirname, '/frontend')));
app.set('views', __dirname + config().frontend_path);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var readOnly = false;
if (program.read) readOnly = true;

app.get('/', function(req, res) {
  res.render('index', {
    datas: fileDatas,
    format: formatFile,
    readonly: readOnly
  });
});

app.post('/save', function(req, res) {
  var datas = req.body.datas;
  fs.writeFileSync(filepath, datas, "UTF-8");
  console.log('Log: Save successfull (' + path.basename(filepath) + ')');
});

io.on('connection', function(socket) {
  socket.on("docOnChange", function(doc) {
    socket.broadcast.emit('docChange', doc);
  });
});

server.listen(port);

console.log('Edit share is running on port ' + port);

open('http://127.0.0.1:' + port);
