// const express = require("express")
import express from "express"
import dotenv from "dotenv"
import conectarDB from "./config/db.js";

const app = express();

//Buscar Variables de entorno
dotenv.config()

//variable Puerto 
const PORT = process.env.PORT || 4000

//Conectar a la BD
conectarDB();

app.listen(PORT, () =>{
    console.log(`server run ${PORT}`);
})


