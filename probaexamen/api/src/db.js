// db.js
import mysql from 'mysql2/promise';
import 'dotenv/config';
// anar en cuidao en el dotenv
// ja que dona varios errors al conectar 
// a la base de datos

// Create a connection pool
const con = await mysql.createPool({
    host: 'localhost',
    user: process.env.MYSQL_ROOT_PASSWORD,
    password: process.env.MYSQL_USER,
    database: 'appdb',
});

export default con;