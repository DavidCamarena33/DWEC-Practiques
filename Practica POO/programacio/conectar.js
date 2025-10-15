let mysql = require('mysql2');

let con = mysql.createConnection({
  host: "localhost",
  user: "alumno",
  password: "alumno",
  database: "bibliotecagen"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("conexion a la base completada");
});

module.exports = con;
