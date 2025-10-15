const express = require('express')
const con = require('./conectar');

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
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


