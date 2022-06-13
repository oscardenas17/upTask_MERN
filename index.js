// const express = require("express")
import express from "express"
import dotenv from "dotenv"
import conectarDB from "./config/db.js";
import usuarioRoutes from './routes/usuarioRoutes.js'
import proyectoRoutes from './routes/proyectoRoutes.js'

const app = express();
//Habilitar Json
app.use(express.json())

//Buscar Variables de entorno
dotenv.config()

//Conectar a la BD
conectarDB();

//Routing  (.use responde a todos los verbos https)
app.use('/api/usuarios', usuarioRoutes)
app.use('/api/proyectos', proyectoRoutes)


//variable Puerto 
const PORT = process.env.PORT || 4000
app.listen(PORT, () =>{
    console.log(`server run ${PORT}`);
})


//'/api/usuarios'