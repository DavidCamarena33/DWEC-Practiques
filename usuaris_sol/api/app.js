import express from 'express'
import 'dotenv/config';
import cookieParser from 'cookie-parser';

import userRoutes from './routes/user.routes.js'

const app = express()
const port = process.env.PORT || 3000;

app.use(express.json())
app.use(cookieParser())

app.use('/', userRoutes);

const errorHandler = (err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send(`Error al servidor:\n ${err}`)
}

app.use(errorHandler);

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})
