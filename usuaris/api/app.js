import express from "express";
import con from "./db.js";
import bcrypt from "bcryptjs";

const app = express();
app.use(express.json());
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const Autorizacion = async (req, res, next) => {
  const { name, pass, role } = req.headers;

    const salt = 10;
    const hash = bcrypt.hashSync(pass, salt);

  const [comprobar] = await con.query(
    'select * from users where name = ? ',
    [name]
  );
  
  if(bcrypt.compare(hash, pass)){
    if (comprobar.length == 0) {
        const error = new Error("No existe en la base de datos");
        error.status = 401;
        throw error;
    } else {
        if (role == "user") {
            const error = new Error("No tienes suficientes permisos");
            error.status = 403;
            throw error;
        } else if (role == "admin") {
            next();
            return;
        }
    }
  }
};

app.get("/api/users", Autorizacion, async (req, res, next) => {
  try {
    const [rows] = await con.query("select name, role from users");
    res.json(rows);
  } catch (err) {
    next(err);
  }
});

app.post("/api/users", async (req, res, next) => {
  try {
    const { name, password, role } = req.body;

    const salt = 10;
    const hash = bcrypt.hashSync(password, salt);

    const seguro = "insert into users(name, password,role) values (?,?,?)";
    const [insertar] = await con.query(seguro, [name, hash, role]);

    res.status(201).json({ message: "Persona insertada correctamente " });
  } catch (err) {
    next(err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
