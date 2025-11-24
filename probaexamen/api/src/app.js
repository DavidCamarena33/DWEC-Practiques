import express from 'express'
// sempre posar el "./"
import con from './db.js'
import cors from 'cors';

const app = express()
app.use(cors());
const port = 3000

// posar este middelware per a que vaja el post
app.use(express.json());

// agafaro del header (si es un valor asoles es header si son varios headers)
const requireAdmin = (req, res, next) => {
  const { name, password, role } = req.headers;
  if (name == "fred" && password == "fred" && role == "admin") {
    next();
    return;
  }
  const error = new Error("Credenciales invalidas");
  error.status = 403;
  throw error;
};

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/usuarios', requireAdmin, async (req, res, next) => {
  try {
    const [rows] = await con.query("select id, name, role from example");
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

app.post('/usuarios', async (req, res, next) => {
  try {
    const { name, password, role } = req.body;

    // aço es per a evitar la injeccio sql
    // es diu placeholder
    const seguro = "insert into example(name, password,role) values (?,?,?)";
    const [insertar] = await con.query(
      seguro,
      [name, password, role]
    );

    res.status(201).json({ message: "Persona insertada correctamente " })

  } catch (err) {
    next(err);
  }
});

// middelware de errors
app.use((err, req, res, next) => {
  console.error("❌ Error capturado:", err);

  // Valores por defecto
  let status = 500;
  let message = "Error interno del servidor";

  // 📦 Errores MySQL comunes
  if (err.code) {
    switch (err.code) {
      case "ER_DUP_ENTRY":
        status = 409;
        message = "Registro duplicado";
        break;
      case "ER_BAD_FIELD_ERROR":
        status = 400;
        message = "Campo o columna no válido";
        break;
      case "ER_NO_REFERENCED_ROW_2":
      case "ER_ROW_IS_REFERENCED_2":
        status = 409;
        message = "Violación de clave foránea";
        break;
      case "ER_PARSE_ERROR":
        status = 400;
        message = "Error de sintaxis SQL";
        break;
      case "ER_ACCESS_DENIED_ERROR":
        status = 403;
        message = "Acceso denegado a la base de datos";
        break;
      case "PROTOCOL_CONNECTION_LOST":
        status = 503;
        message = "Conexión con la base de datos perdida";
        break;
      default:
        message = err.message || message;
    }
  } else if (err.status) {
    // Si se definió un código HTTP en el error manualmente
    status = err.status;
    message = err.message;
  } else if (err.message) {
    // Error genérico con mensaje
    message = err.message;
  }

  res.status(status).json({ error: message });
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
});
