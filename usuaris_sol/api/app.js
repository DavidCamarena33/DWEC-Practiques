import express from 'express'
import bcrypt from 'bcrypt'
import connection from './db.js'
import jwt from "jsonwebtoken"
const secretKey = "Fiasco";

const app = express()
const port = 3000

const endopoint = '/api/users'

app.use(express.json())

app.get(endopoint, verifyToken, async (req, res) => {
    try {
        const role = req.role;

        if(role == "admin"){
           const [results] = await connection.query(
            'SELECT name, role FROM users'
            );
            res.status(200).json(results) 
        }else{
            res.status(403).json({message: "No tienes suficientes permisos"});
        }
        
    } catch (err) {
        errorHandler(err)
    }
});

app.post(endopoint, async (req, res) => {
    try {
        const { name, password, role = "user"} = req.body
        
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const [results] = await connection.query(
            'INSERT INTO users(name, password, role) VALUES(?, ?, ?)',
            [name, hashedPassword, role]
        );
        res.status(200).json(results)
    } catch (err) {
        errorHandler(err)
    }
});

app.post('/login', async (req, res) =>{
    try{
        const { name, password } = req.body;

        const [login] = await connection.query(
            'select role, password from users where name = ?',
            [name]
        );

        const role = login[0].role;
        
        const passwordMatched = await bcrypt.compare(password, login[0].password);
        
        if(login.length == 1){
            if(passwordMatched){               
                const token = jwt.sign({ name, password, role }, secretKey, { expiresIn: "1h" });
                return res.status(200).json({ token });   
            }else{
                res.status(500).json({ message: "Error del servidor" });
            }
        }else{
            res.status(401).json({ message: "Authentication failed" });
        }

    }catch (err) {
        errorHandler(err)
    }
});



function verifyToken(req, res, next) {
  const header = req.header("Authorization") || "";
  const token = header.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token not provied" });
  }
  try {
    const payload = jwt.verify(token, secretKey);
    req.role = payload.role;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token not valid" });
  }
}

// const requireAdmin = async (req, res, next) => {
//     try {
//         const { name, password } = req.body
//         const [results] = await connection.query(
//             'SELECT role, password FROM users WHERE name = ?',
//             [name]
//         )
//         const passwordMatched = await bcrypt.compare(password, results[0].password);
//         if (results.length === 0) {
//             res.status(401).send('Usuari no autoritzat')
//         } else {
//             if (results[0].role === 'admin' && passwordMatched) {
//                 next()
//             } else {
//                 res.status(403).send('No tens permissos')
//             }
//         }
//     } catch (err) {
//         errorHandler(err)
//     }
// }


const errorHandler = (err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send(`Error al servidor:\n ${err}`)
}

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})
