const express = require('express');
const router = express.Router();
var mysql = require('mysql');

const kill = (title) => {

  console.log(title);

  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'user'
  });

  connection.connect();

  connection.query("DELETE from html WHERE title = ?", [title], function (err, res) {
    if (err) throw err
  });

  connection.end();


  return "success";
};

router.post('/', (req, res) => {
  res.send(kill(req.body.name));
});

module.exports = router;
