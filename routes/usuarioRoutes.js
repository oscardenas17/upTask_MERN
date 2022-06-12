import express from 'express';
const router  =  express.Router();

import {autenticar, confirmar, registrar} from '../controllers/usuarioController.js';


//Autenticación, registro y confirmación de Usuarios

router.post('/',  registrar); //crea un nuevo usuario
router.post('/login', autenticar); // index-app.use('/api/usuarios'-se concatena = /api/usuarios/login
router.get('/confirmar/:token', confirmar);



export default router;