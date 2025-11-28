import express from 'express'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
const secretKey = process.env.SECRET;
import 'dotenv/config';
import cookieParser from "cookie-parser"

const app = express()
app.use(cookieParser())

import { QloginVerify, QInsertUser } from "../models/querys.js";
import { QGetAllUsers } from "../models/querys.js";

export const GetUsers = async (req, res, next) => {
    try {
        const results = await QGetAllUsers();

        res.status(200).json(results);
    } catch (err) {
        next(err);
    }
};

export const InsertUser = async (req, res, next) => {
    try {
        const { name, password, role = "user" } = req.body

        const results = await QInsertUser(name, password, role);

        if(results.affectedRows === 1){
            res.status(200).json({message: "Persona insertada correctamente"})
        }else{
            res.status(400).json({message: "Persona no insertada"})
        }
    } catch (err) {
        next(err)
    }
}

export const loginVerify = async (req, res, next) => {
    try{
            const { name, password } = req.body;
    
            const login = await QloginVerify(name, password);
    
            const role = login[0].role;
            
            const passwordMatched = await bcrypt.compare(password, login[0].password);
            
            if(login.length == 1){
                if(passwordMatched){               
                    const token = jwt.sign({ name, role }, secretKey, { expiresIn: "1h" });
                    res.cookie('galleta', token, {
                        httpOnly: true,    
                        maxAge: 3600000 
                        });
                    return res.status(200).json({message: "Autentificacion correcta" });   
                }else{
                    res.status(500).json({ message: "Error del servidor" });
                }
            }else{
                res.status(401).json({ message: "Authentication failed" });
            }
    
        }catch (err) {
            next(err)
        }
}