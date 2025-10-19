let mysql = require('mysql2');
// import mysql from "mysql2/promise";

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
