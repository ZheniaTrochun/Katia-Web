'use strict';

const express = require('express');
const router = express.Router();
var mysql = require('mysql');

const getAllTitles = (res) => {

  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'user'
  });

  connection.connect();

  // let resObj = {};

  connection.query("SELECT * FROM `html`", function (err, rows, fields) {
    connection.end();
    if (err) throw err;
    //  console.log(rows);
    // resObj = rows;
    res.send(rows);
  });
};

router.get('/', (req, res) => {
  getAllTitles(res);
});

module.exports = router;
