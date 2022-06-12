import express from 'express';
const router  =  express.Router();

import {autenticar, comprobarToken, confirmar, nuevoPassword, olvidePassword, perfil, registrar} from '../controllers/usuarioController.js';
import checkAuth from '../middleware/checkAuth.js';

//Autenticación, registro y confirmación de Usuarios

router.post('/',  registrar); //crea un nuevo usuario
router.post('/login', autenticar); // index-app.use('/api/usuarios'-se concatena = /api/usuarios/login
router.get('/confirmar/:token', confirmar);
router.post('/olvide-password',olvidePassword); //generar token recuperar pass

//router.get('/olvide-password/:token',comprobarToken);//comprueba token recuperar pass
//router.get('/olvide-password/:token',nuevoPassword); // Asignar nuevo password
router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword);

//endpoint que recibe el jwt  y pasa el perfil del usuario
//entra al endpoint /perfil, ejecuta el checkAuth y luego muestra el perfil
//en checkAuth protege el endpoint, que usuario, jwt sea correcto
router.get('/perfil', checkAuth, perfil)

export default router;