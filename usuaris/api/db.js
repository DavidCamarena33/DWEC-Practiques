import mysql from 'mysql2/promise'

const con = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "users"
});

con.connect(err => {
    if (err) {
        console.error("Database Connection Error:", err);
    } else {
        console.log('Successfully connected to the database');
    }
});

export default con;