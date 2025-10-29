import mysql from 'mysql2/promise';

export const con = await mysql.createPool({
    host: "localhost",
    user: "alumno",
    password: "alumno",
    database: "bibliotecagen"
});

(async () => {
    try {
        const connection = await con.getConnection();
        connection.release(); 
        console.log("Pool de conexiones a la base de datos configurado correctamente.");
    } catch (err) {
        console.error("Error al verificar la conexión inicial del Pool:", err.message);
    }
})();