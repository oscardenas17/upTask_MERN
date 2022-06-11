// const express = require("express")
import express from "express"
import dotenv from "dotenv"
import conectarDB from "./config/db.js";

const app = express();

//Buscar Variables de entorno
dotenv.config()

//Conectar a la BD
conectarDB();

//variable Puerto 
const PORT = process.env.PORT || 4000




app.listen(PORT, () =>{
    console.log(`server run ${PORT}`);
})


