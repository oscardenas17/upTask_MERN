import express from 'express'
const router  =  express.Router();
import checkAuth from '../middleware/checkAuth.js'

import {
    agregarTarea,
    obtenerTarea,
    actualizarTarea,
    eliminarTarea,
    cambiarEstado,

} from '../controllers/tareaController.js'

//  /api/tarea
router.post('/', checkAuth,agregarTarea)
//  /api/tarea/id
router.route('/:id').get(checkAuth,obtenerTarea)
                    .put(checkAuth,actualizarTarea)
                    .delete(checkAuth,eliminarTarea) 

router.post('/estado/:id',checkAuth, cambiarEstado)

export default router 