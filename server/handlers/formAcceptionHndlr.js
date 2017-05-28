const express = require('express');
const router = express.Router();
var mysql = require('mysql');

const submit = (login, phone, email, time) => {

  console.log(login);
  console.log(phone);
  console.log(email);
  console.log(time);

	const loginRegExpr = new RegExp('^[A-Z].*$');
  const emailRegExpr = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const phoneRegExpr = /^[0-9]{7}/;

	if(!loginRegExpr.test(login) || !phoneRegExpr.test(phone) || !emailRegExpr.test(email)) {
		return "error";
	}

  // TODO save in base

  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'user'
  });

  connection.connect();

  const values = [
    [login, +phone, email, time]
  ];

  connection.query("INSERT INTO `user_table` values ?", [values], function (err, res) {
    if (err) throw err

  });

  connection.end();


  return "success";
};

router.post('/', (req, res) => {
  res.send(submit(req.body.login, req.body.phone, req.body.email, req.body.time));
});

module.exports = router;
