// const express = require("express")
import express from "express"
import dotenv from "dotenv"
import cors from "cors"
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

//configurar CORS
//crear whitelist
const whitelist = [process.env.FRONTEND_URL];
//const whitelist = ['http://localhost:3000'];
const corsOptions= {
    origin: function(origin, callback){
        //console.log(origin);
        if(whitelist.includes(origin)){
            callback(null, true); //Puede consultar API - null no error, true da acceso
        }else{
            callback(new Error('Error de Cors')); //No esta permitido
        }
    },
};
app.use(cors(corsOptions))
//fin CORS

//Routing  (.use responde a todos los verbos https)
app.use('/api/usuarios', usuarioRoutes)
app.use('/api/proyectos', proyectoRoutes)


//variable Puerto 
const PORT = process.env.PORT || 4000
app.listen(PORT, () =>{
    console.log(`server run ${PORT}`);
})


//'/api/usuarios'