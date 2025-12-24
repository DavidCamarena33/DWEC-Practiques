import express from 'express'
import connection from './server.js'
import cors from 'cors'

const app = express()
const port = 3000
app.use(express.json())
app.use(cors());
app.use(express.static('public'));

app.get("/pokemons", async (req, res, next) => {

    const [results] = await connection.query(
        'select * from pokemon'
    );

    res.json(results);
})

app.post("/pokemons", async (req, res, next) => {
  try {
    const { nombre, tipo, region } = req.body;


    const [results] = await connection.query(
        'insert into pokemon(nombre, tipo, region) values (?,?,?)',
        [nombre, tipo, region ]
    );

    res.status(201).json({ message: "Pokemon creat correctamente " });
  } catch (err) {
    next(err);
  }
});


app.put("/pokemons/:id", async (req, res, next) => {
    
    const { id } = req.params;
    const { nombre, tipo, region } = req.body;
    
    const [results] = await connection.query(
        'update pokemon set nombre = ?, tipo = ?, region = ? where id = ? ',
        [nombre, tipo, region, id ]
    );
    
    res.status(201).json({ message: "Pokemon modificat correctamente " });
})

app.delete("/pokemons/:id", async (req, res, next) => {

    const { id } = req.params;

    const [results] = await connection.query(
        'delete from pokemon where id = ? ',
        [ id ]
    );

    res.status(201).json({ message: "Pokemon eliminat correctamente " });

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})













// app.get("/pokemons/:id", async (req, res, next) =>{

//     const { id } = req.params;

//     const [results] = await connection.query(
//         'select * from pokemon where id = ?',
//         [id]
//     );

//     res.json(results);
// })