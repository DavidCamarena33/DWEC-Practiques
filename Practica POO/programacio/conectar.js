import mysql from 'mysql2/promise';

const con = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 3306,
});

(async () => {
    let retries = 5; // Intentará 5 veces
    while(retries > 0) {
        try {
            // Intenta conectar
            const connection = await con.getConnection();
            connection.release(); 
            console.log("✅ Pool de conexiones a la base de datos configurado correctamente.");
            return; // ¡Éxito! Salimos del bucle.
        } catch (err) {
            // Si falla, espera y reintenta
            console.error(`Error al conectar a la BD (reintento ${6-retries}):`, err.code);
            retries--;
            await new Promise(res => setTimeout(res, 5000)); 
        }
    }
    
    console.error("FATAL: No se pudo conectar a la base de datos después de 5 intentos. Saliendo.");
    process.exit(1);
})();

export default con