#!/usr/bin/env node

var path = require('path'),
  fs = require('fs'),
  express = require('express'),
  config = require('./config.js'),
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
  fileDatas = fs.readFileSync(filename, 'UTF-8');

console.log(fileDatas);
console.log(path.extname(filename));

var app = express();
app.use(express.static(path.join(__dirname, 'app')));
app.set('views', __dirname + config.frontend_path);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', function(req, res) {
  res.render('index', {
    datas: fileDatas,
    extension: path.extname(filename)
  });
});

app.post('/save', function(req, res) {
  var datas = req.body.datas;
  fs.writeFileSync(filename, datas, "UTF-8");
});

app.listen(port);

console.log('Edit share is running on port ' + port);

open('http://127.0.0.1:' + port);
