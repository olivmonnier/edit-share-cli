#!/usr/bin/env node

var path = require('path'),
  fs = require('fs'),
  express = require('express'),
  pkg = require(path.join(__dirname, 'package.json')),
  program = require('commander'),
  open = require("open");

program
  .version(pkg.version)
  .option('-p, --port <port>', 'Port on which to listen to (defaults to 3000)',
    parseInt)
  .parse(process.argv);

var port = program.port || 3000;

var filename = process.argv[2],
  fileDatas = fs.readFileSync(filename, 'utf8');

console.log(fileDatas);

var app = express();
app.use(express.static(path.join(__dirname, 'app')));
app.set('views', __dirname + '/app/views');
app.set('view engine', 'jade');

app.use('/', function(req, res) {
  res.render('index', {
    datas: fileDatas
  });
});

app.listen(port);

console.log('Edit share is running on port ' + port);

open('http://127.0.0.1:' + port);
