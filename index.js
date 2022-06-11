// const express = require("express")
import express from "express"
import dotenv from "dotenv"
import conectarDB from "./config/db.js";

const app = express();

//Buscar Variables de entorno
dotenv.config()

//Conectar a la BD
conectarDB();

app.listen(4000, () =>{
    console.log('server run 4000');
})


