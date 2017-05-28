'use strict';

var express = require('express');

var bodyParser = require('body-parser');

const fs = require('fs');

var mysql = require('mysql');

const formAcceptionHndlr = require('./handlers/formAcceptionHndlr.js');
const killRowHandler = require('./handlers/killRowHandler.js');
const saveRowHandler = require('./handlers/saveRowHandler.js');
const getAllTableHndlr = require('./handlers/getAllTableHndlr.js');

var app = express();

// body parser

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.use(express.static('/home/zhenia/1lab/static'));

app.use('/subscribe', formAcceptionHndlr);
app.use('/killRow', killRowHandler);
app.use('/saveRow', saveRowHandler);
app.use('/getHtmlTable', getAllTableHndlr);

app.listen(8080, function () {
    // onServerStart();

    console.log('App listening on port 8080!');
});

const onServerStart = () => {
  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'user'
  });

  connection.connect();

  const values = [];

  let title;
  let meta;
  let body;

  const fileReadPromise = new Promise(function(resolve, reject) {
    fs.readFile('/home/zhenia/1lab/static/html/index.html', function (err,data) {
      if (err) {
        console.log(err);

        reject();
      }

      meta = data.slice(data.indexOf('<head>') + 6, data.indexOf('</head>'));
      body = data.slice(data.indexOf('<body>') + 6, data.indexOf('</body>'));
      title = data.slice(data.indexOf('<title>') + 7, data.indexOf('</title>'));

      values.push([title, meta, body]);
      resolve();
    });
  });

  fileReadPromise.then(result => {
      return new Promise(function(resolve, reject) {
        fs.readFile('/home/zhenia/1lab/static/html/page_cards.html', function (err,data) {
          if (err) {
            console.log(err);
            reject();
          }

          meta = data.slice(data.indexOf('<head>') + 6, data.indexOf('</head>'));
          body = data.slice(data.indexOf('<body>') + 6, data.indexOf('</body>'));
          title = data.slice(data.indexOf('<title>') + 7, data.indexOf('</title>'));

          values.push([title, meta, body]);
          resolve();
        });
      });
  }).then(result => {
    return new Promise(function(resolve, reject) {
      fs.readFile('/home/zhenia/1lab/static/html/page_table.html', function (err,data) {
        if (err) {
          console.log(err);
          reject();
        }

        meta = data.slice(data.indexOf('<head>') + 6, data.indexOf('</head>'));
        body = data.slice(data.indexOf('<body>') + 6, data.indexOf('</body>'));
        title = data.slice(data.indexOf('<title>') + 7, data.indexOf('</title>'));

        values.push([title, meta, body]);
        resolve();
      });
    });
  }).then(result => {
    connection.query("INSERT INTO `html` values ?", [values], function (err, res) {
      if (err) throw err;
    });

    connection.end();
  });
};
