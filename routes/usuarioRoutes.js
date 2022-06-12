import express from 'express';
const router  =  express.Router();

import {autenticar, comprobarToken, confirmar, olvidePassword, registrar} from '../controllers/usuarioController.js';


//Autenticación, registro y confirmación de Usuarios

router.post('/',  registrar); //crea un nuevo usuario
router.post('/login', autenticar); // index-app.use('/api/usuarios'-se concatena = /api/usuarios/login
router.get('/confirmar/:token', confirmar);
router.post('/olvide-password',olvidePassword); //generar token recuperar pass
router.get('/olvide-password/:token',comprobarToken);//comprueba token recuperar pass



export default router;