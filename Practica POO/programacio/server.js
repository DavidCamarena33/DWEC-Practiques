import  express from 'express';
import {con} from './conectar.js';
// const con = require('./conectar');

const app = express()
const port = 3000

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get("/recursos", async (req, res) => {36
  try {
    const [rows] = await con.promise().query(
      "SELECT * from recursos"
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

app.get("/llibre", async (req, res) => {36
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
      "select r.id_recurso, r.titol, re.autor, re.fecha, r.disponibles from recursos r join revista re on r.id_recurso = re.id_revista where r.id_tipus = 2"
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
      "select p.id_persona, p.nom, p.dni from persones p join soci s on p.id_persona = s.id_persona"
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

app.post("/persona", async (req, res) => {
  try{
    const { nom, dni, tipus } = req.body;
    // comprobem si algun camp demanat esta buit
    if(!nom || !dni || !tipus){
      const error = new Error("Falten dades");
      error.status = 400;
      throw error;
    }
    const [insert] = await con.promise().query(
      "insert into persones (nom, dni, tipus) values (? ,? ,?)",
      [nom, dni, tipus]
    );
    // si no sa ha afectat ninguna fila tira error
    if(insert.affectedRows === 0){
      const error = new Error("No es posible insertar la persona");
      error.status = 500;
      throw error;
    }
    // insert fet
    res.status(201).json({message: "Persona insertada"});
  }catch (e){
    // error no controlat
    console.error("Error inesperat:", e.message);
    res.status(e.status || 500).json({ error: e.message });
  }
});

app.post("/llibre", async (req, res) =>{
  try{
    const { id_biblioteca, titol, disponibles, autor} = req.body;
    const id_tipus = 1;
    
    if( !id_biblioteca || !titol || !disponibles || !autor){
      const error = new Error("Falten dades");
      error.status = 400;
      throw error;
    }
    const [insert1] = await con.promise().query(
      "insert into recursos (id_biblioteca, titol, disponibles, id_tipus) values (?, ?, ?, ?)",
      [id_biblioteca, titol, disponibles, id_tipus]
    );
    if(insert1.affectedRows === 0){
      const error = new Error("No es posible insertar el llibre");
      error.status = 500;
      throw error;
    }
    // agafem el id del recurs per a que siguen igual
    // iguals el id del recurs i el del llibre
    const id_recurs = insert1.insertId;

    const [insert2] = await con.promise().query(
      "insert into llibre (id_llibre, autor) values (?, ?)",
      [id_recurs, autor]
    );
    if(insert2.affectedRows === 0){
      const error = new Error("No es posible insertar el llibre");
      error.status = 500;
      throw error;
    }

    res.status(201).json({message: "Llibre insertat"});
  
  }catch (e){
    console.error("Error inesperat:", e.message);
    res.status(e.status || 500).json({ error: e.message });
  }
});

app.post("/revista", async (req, res) =>{
  try{
    const { id_biblioteca, titol, disponibles, autor, fecha } = req.body;
    const id_tipus = 2;
    
    if( !id_biblioteca || !titol || !disponibles || !autor || !fecha ){
      const error = new Error("Falten dades");
      error.status = 400;
      throw error;
    }
    const [insert1] = await con.promise().query(
      "insert into recursos (id_biblioteca, titol, disponibles, id_tipus) values (?, ?, ?, ?)",
      [id_biblioteca, titol, disponibles, id_tipus]
    );
    if(insert1.affectedRows === 0){
      const error = new Error("No es posible insertar la revista");
      error.status = 500;
      throw error;
    }

    const id_recurs = insert1.insertId;

    const [insert2] = await con.promise().query(
      "insert into revista (id_revista, autor, fecha) values (?, ?, ?)",
      [id_recurs, autor, fecha]
    );
    if(insert2.affectedRows === 0){
      const error = new Error("No es posible insertar la revista");
      error.status = 500;
      throw error;
    }

    res.status(201).json({message: "Revista insertada"});
  
  }catch (e){
    console.error("Error inesperat:", e.message);
    res.status(e.status || 500).json({ error: e.message });
  }
});

app.post("/pelicula", async (req, res) =>{
  try{
    const { id_biblioteca, titol, disponibles, director, genere } = req.body;
    const id_tipus = 3;
    
    if( !id_biblioteca || !titol || !disponibles || !director || !genere ){
      const error = new Error("Falten dades");
      error.status = 400;
      throw error;
    }
    const [insert1] = await con.promise().query(
      "insert into recursos (id_biblioteca, titol, disponibles, id_tipus) values (?, ?, ?, ?)",
      [id_biblioteca, titol, disponibles, id_tipus]
    );
    if(insert1.affectedRows === 0){
      const error = new Error("No es posible insertar la pelicula");
      error.status = 500;
      throw error;
    }

    const id_recurs = insert1.insertId;

    const [insert2] = await con.promise().query(
      "insert into peli (id_peli, director, genere) values (?, ?, ?)",
      [id_recurs, director, genere]
    );
    if(insert2.affectedRows === 0){
      const error = new Error("No es posible insertar la pelicula");
      error.status = 500;
      throw error;
    }

    res.status(201).json({message: "Pelicula insertada"});
  
  }catch (e){
    console.error("Error inesperat:", e.message);
    res.status(e.status || 500).json({ error: e.message });
  }
});

app.post("/admins", async (req, res) =>{
  try{
    const { id_biblioteca, nom, dni, carrec } = req.body;
    
    if( !id_biblioteca || !nom || !dni || !carrec ){
      const error = new Error("Falten dades");
      error.status = 400;
      throw error;
    }
    const [insert1] = await con.promise().query(
      "insert into persones (id_biblioteca, nom, dni, tipus) values (?, ?, ?, administrador)",
      [id_biblioteca, nom, dni]
    );
    if(insert1.affectedRows === 0){
      const error = new Error("No es posible insertar el admin");
      error.status = 500;
      throw error;
    }

    const id_persona = insert1.insertId;

    const [insert2] = await con.promise().query(
      "insert into admins (id_persona, carrec) values (?, ?)",
      [id_persona, carrec]
    );
    if(insert2.affectedRows === 0){
      const error = new Error("No es posible insertar el admin");
      error.status = 500;
      throw error;
    }

    res.status(201).json({message: "Administrador insertat"});
  
  }catch (e){
    console.error("Error inesperat:", e.message);
    res.status(e.status || 500).json({ error: e.message });
  }
});

app.post("/soci", async (req, res) =>{
  try{
    const { id_biblioteca, nom, dni } = req.body;
    
    if( !id_biblioteca || !nom || !dni ){
      const error = new Error("Falten dades");
      error.status = 400;
      throw error;
    }
    const [insert1] = await con.promise().query(
      "insert into persones (id_biblioteca, nom, dni, tipus) values (?, ?, ?, soci)",
      [id_biblioteca, nom, dni]
    );
    if(insert1.affectedRows === 0){
      const error = new Error("No es posible insertar el soci");
      error.status = 500;
      throw error;
    }

    const id_persona = insert1.insertId;

    const [insert2] = await con.promise().query(
      "insert into soci (id_persona) values (?)",
      [id_persona]
    );
    if(insert2.affectedRows === 0){
      const error = new Error("No es posible insertar el soci");
      error.status = 500;
      throw error;
    }

    res.status(201).json({message: "Soci insertat"});
  
  }catch (e){
    console.error("Error inesperat:", e.message);
    res.status(e.status || 500).json({ error: e.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});