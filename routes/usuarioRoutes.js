import express from 'express';
const router  =  express.Router();

import {registrar} from '../controllers/usuarioController.js';


//Autenticación, registro y confirmación de Usuarios
;
router.post('/',  registrar); //crea un nuevo usuario



export default router;