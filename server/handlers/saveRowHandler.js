const express = require('express');
const router = express.Router();
var mysql = require('mysql');

const save = (title, meta, body, res) => {

  console.log(title);

  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'user'
  });

  connection.connect();

  connection.query('UPDATE html SET meta = ?, body = ? WHERE title = ?', [meta, body, title], function (err, res) {
    if (err) throw err;
  });

  connection.query("SELECT * FROM `html`", function (err, rows, fields) {
    connection.end();
    if (err) throw err;
    //  console.log(rows);
    // resObj = rows;
    res.send(rows);
  });
};

router.post('/', (req, res) => {
  save(req.body.title, req.body.meta, req.body.body, res);
});

module.exports = router;
