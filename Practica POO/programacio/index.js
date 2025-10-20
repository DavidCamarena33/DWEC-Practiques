const express = require('express')
const con = require('./conectar');

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/revista', (req, res) => {
  const sql = `
    SELECT r.id_recurso, r.titol, re.autor, re.fecha, r.disponibles
    FROM recursos r
    JOIN revista re ON r.id_recurso = re.id_revista
  `;

  con.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);

    res.json(results); 
  });
});

app.get('/llibre', (req, res) => {
  const sql = `
    SELECT r.id_recurso, r.titol, l.autor , r.disponibles
    FROM recursos r
    JOIN llibre l ON r.id_recurso = l.id_llibre
  `;

  con.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);

    res.json(results); 
  });
});

app.get('/pelicula', (req, res) => {
  const sql = `
    SELECT r.id_recurso, r.titol, p.director, p.genere, r.disponibles
    FROM recursos r
    JOIN peli p ON r.id_recurso = p.id_peli
  `;

  con.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);

    res.json(results); 
  });
});

app.get('/admin', (req, res) => {
  const sql = `
    SELECT p.id_persona, p.nom, p.dni, a.carrec
    FROM persones p
    JOIN admins a ON p.id_persona = a.id_persona
  `;

  con.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);

    res.json(results); 
  });
});

app.get('/recursos', (req, res) => {
  const sql = `
    select *
    from recursos
  `;

  con.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);

    res.json(results); 
  });
});

app.get('/persones', (req, res) => {
  const sql = `
    select *
    from persones
  `;

  con.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);

    res.json(results); 
  }); 
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

