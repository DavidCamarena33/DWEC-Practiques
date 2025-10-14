// programacio/Main.js

const express = require('express');
// Importamos la conexión a la base de datos
const db = require('./conectar');

const app = express();
const PORT = 3000;

// Middleware y configuraciones de Express (si las necesitas)
app.use(express.json());

// --- Ejemplo de RUTA para obtener todas las películas ---
app.get('/api/peliculas', (req, res) => {
    // Usamos el objeto 'db' importado para ejecutar la consulta
    const sql = 'SELECT * FROM Pelicula';

    // Ejecutamos la consulta
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            // Si hay un error, devolvemos un estado 500 (Error Interno del Servidor)
            return res.status(500).json({ error: 'Error al consultar la base de datos.' });
        }
        // Si todo va bien, devolvemos los datos en formato JSON
        res.json({
            data: rows
        });
    });
});

// --- Ejemplo de RUTA para crear una nueva Película ---
app.post('/api/peliculas', (req, res) => {
    // Aquí deberías validar req.body
    const { titulo, director } = req.body;
    
    // Consulta de inserción segura (usando placeholders '?')
    const sql = 'INSERT INTO Pelicula (titulo, director) VALUES (?, ?)';
    
    db.run(sql, [titulo, director], function(err) {
        if (err) {
            console.error(err.message);
            return res.status(400).json({ error: 'Error al insertar la película.' });
        }
        // Devolvemos el ID generado por la base de datos
        res.status(201).json({ 
            message: 'Película creada con éxito', 
            id: this.lastID 
        });
    });
});


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor Express ejecutándose en http://localhost:${PORT}`);
});


// ** MANEJO DEL CIERRE DE CONEXIÓN **
// En Express, generalmente NO cierras la conexión (db.close()) después de cada consulta.
// La mantienes abierta y la cierras solo cuando el proceso de Node.js se detiene.
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Error al cerrar la base de datos:', err.message);
        }
        console.log('\nBase de datos cerrada. Servidor apagado.');
        process.exit(0);
    });
});

const TIPOS_RECURSO_VALIDOS = ['libres', 'revistes', 'pelicules'];

app.get('/recursos/:tipo/:id', (req, res) => {
    const tipo = req.params.tipo.toLowerCase();
    const id = req.params.id;

    if (!TIPOS_RECURSO_VALIDOS.includes(tipo)) {
        return res.status(400).json({ error: 'Tipo de recurso no válido' });
    }

    let nombreTabla = tipo.slice(0, -1);
    nombreTabla = nombreTabla.charAt(0).toUpperCase() + nombreTabla.slice(1);
    
    const sql = `SELECT * FROM ${nombreTabla} WHERE id = ?`;

    db.get(sql, [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Error de base de datos.' });
        }

        if (!row) {
            return res.status(404).json({ error: `${nombreTabla} con ID ${id} no encontrado.` });
        }

        res.json({
            tipo: nombreTabla,
            data: row
        });
    });
});