#!/usr/bin/env node

var path = require('path'),
  fs = require('fs'),
  express = require('express'),
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
  .parse(process.argv);

var port = program.port || 3000;

var filename = process.argv[2],
  fileDatas = fs.readFileSync(filename, 'UTF-8'),
  formatFile = format(path.extname(filename));

var app = express();
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
    datas: fileDatas,
    format: formatFile
  });
});

app.post('/save', function(req, res) {

  var datas = req.body.datas;
  fs.writeFileSync(filename, datas, "UTF-8");
});

app.listen(port);

console.log('Edit share is running on port ' + port);

open('http://127.0.0.1:' + port);
