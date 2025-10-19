const express = require('express')
const con = require('./conectar');

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
});


app.get("/llibre", async (req, res) => {
  try {
    const [rows] = await con.promise().query(
      "SELECT r.id_recurso, r.titol, l.autor , r.disponibles FROM recursos r JOIN llibre l ON r.id_recurso = l.id_llibre"
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

app.get("/revista", async (req, res) =>{
  try{
    const [rows] =  await con.promise().query(
      "select r.id_recurso, r.titol, re.autor, re.fecha, r.disponibles from recursos r join revista re on r.id_recurso = re.id_revista"
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({message: "Error interno del servidor"});
  }
});

app.get("/pelicula", async (req, res) => {
  try{
    const [rows] =  await con.promise().query(
      "select r.id_recurso, r.titol, p.director, p.genere, r.disponibles from recursos r join peli p on r.id_recurso = p.id_peli"
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({message: "Error interno del servidor"});
  }
});

app.get("/llibre/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await con.promise().query(
      "SELECT r.id_recurso, r.titol, l.autor , r.disponibles FROM recursos r JOIN llibre l ON r.id_recurso = l.id_llibre WHERE r.id_recurso = ?",
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "Libro no encontrado" });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

app.get("/revista/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await con.promise().query(
      "select r.id_recurso, r.titol, re.autor, re.fecha, r.disponibles from recursos r join revista re on r.id_recurso = re.id_revista WHERE r.id_recurso = ?",
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "Revista no encontrado" });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

app.get("/pelicula/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await con.promise().query(
      "select r.id_recurso, r.titol, p.director, p.genere, r.disponibles from recursos r join peli p on r.id_recurso = p.id_peli WHERE r.id_recurso = ?",
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "Pelicula no encontrado" });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

app.get("/persones", async (req, res) => {
  try{
    const [rows] = await con.promise().query(
      "select id_persona, nom, dni ,tipus from persones"
    );
    res.json(rows);
  }catch (error){
    res.status(500).json({message: "Error interno del servidor"});
  }
});

app.get("/soci", async (req, res) => {
  try{
    const [rows] = await con.promise().query(
      "select p.id_persona, p.nom, p.dni, p.tipus from persones p join soci s on p.id_persona = s.id_persona"
    );
    res.json(rows);
  }catch (error){
    res.status(500).json({message: "Error interno del servidor"});
  }
});

app.get("/admins", async (req, res) => {
  try{
    const [rows] = await con.promise().query(
      "select p.id_persona, p.nom, p.dni, p.tipus, a.carrec from persones p join admins a on p.id_persona = a.id_persona"
    );
    res.json(rows);
  }catch (error){
    res.status(500).json({message: "Error interno del servidor"});
  }
});

app.get("/prestecs/:id/:soci/:recurs", async (req, res) => {
  try{
    const { id ,soci ,recurs} = req.params;
    const [rows] = await con.promise().query(
      "select * from prestec where id_persona = ? and id_recurso = ? and id_prestec = ?",
      [soci, recurs, id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "Prestamo no encontrado" });
    }
    res.json(rows);
  }catch (error){
    res.status(500).json({message: "Error interno del servidor"});
  }
});



app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

