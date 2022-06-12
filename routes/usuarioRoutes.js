import express from 'express';
const router  =  express.Router();

import {autenticar, registrar} from '../controllers/usuarioController.js';


//Autenticación, registro y confirmación de Usuarios

router.post('/',  registrar); //crea un nuevo usuario
router.post('/login', autenticar);   // en el index = app.use('/api/usuarios'- se concatena queda/api/usuarios/login




export default router;