let mysql = require('mysql');

let con = mysql.createConnection({
  host: "localhost",
  user: "alumno",
  password: "alumno"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
