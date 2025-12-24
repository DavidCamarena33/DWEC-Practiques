import express from "express";
import connection from "./server.js";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser"
const secretKey = "examen";

const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());
app.use(cookieParser());

export function verifyToken(req, res, next) {
  //   const header = req.header("Authorization") || "";
  //   const token = header.split(" ")[1];

  const token = req.cookies.galleta;

  if (!token) {
    return res.status(401).json({ message: "Token not provied" });
  }
  try {
    const payload = jwt.verify(token, secretKey);
    req.email = payload.email;
    req.role = payload.role;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token not valid" });
  }
}

app.get("/api/productes", async (req, res, next) => {
  const [results] = await connection.query("select * from productes");

  res.json(results);
});

app.post("/api/productes", async (req, res, next) => {
  try {
    const { nom, quantitat, preu, descripcio } = req.body;

    const [results] = await connection.query(
      "insert into productes(nom, quantitat, preu, descripcio) values (?,?,?,?)",
      [nom, quantitat, preu, descripcio]
    );

    res.status(201).json({ message: "Producte creat correctamente " });
  } catch (err) {
    next(err);
  }
});

app.put("/api/productes/:id", verifyToken, async (req, res, next) => {
  const { id } = req.params;
  const { nom, quantitat, preu, descripcio } = req.body;

  const [results] = await connection.query(
    "update productes set nom = ?, quantitat = ?, preu = ?,descripcio = ?  where id = ? ",
    [nom, quantitat, preu, descripcio, id]
  );

  res.status(201).json({ message: "Producte modificat correctamente " });
});

app.delete("/api/productes/:id", async (req, res, next) => {
  const { id } = req.params;

  const [results] = await connection.query(
    "delete from productes where id = ? ",
    [id]
  );

  res.status(201).json({ message: "Producte eliminat correctamente " });
});

app.post("/api/users", async (req, res, next) => {
  try {
    const { email, password, role = "user" } = req.body;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const [results] = await connection.query(
      "INSERT INTO users(name, password, role) VALUES(?, ?, ?)",
      [email, hashedPassword, role]
    );
    
    if (results.affectedRows === 1) {
      res.status(200).json({ message: "Persona insertada correctamente" });
    } else {
      res.status(400).json({ message: "Persona no insertada" });
    }
  } catch (err) {
    next(err);
  }
});

app.post("/api/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const [login] = await connection.query(
      "select role, password from users where name = ?",
      [email]
    );

    const role = login[0].role;

    const passwordMatched = await bcrypt.compare(password, login[0].password);

    if (login.length == 1) {
      if (passwordMatched) {
        const token = jwt.sign({ email, role }, secretKey, { expiresIn: "1h" });
        res.cookie("galleta", token, {
          httpOnly: true,
          maxAge: 3600000,
        });
        return res.status(200).json({ message: "Autentificacion correcta" });
      } else {
        res.status(500).json({ message: "Error del servidor" });
      }
    } else {
      res.status(401).json({ message: "Authentication failed" });
    }
  } catch (err) {
    next(err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
