import Proyecto from "../models/Proyecto.js"
import Tarea from "../models/Tarea.js"

//Obtiene todos los proyectos del usuario autenticado, no de otros
const obtenerProyectos = async (req, res) =>{
    //condicion para solo traer lo del usuario del req.usuario del checkAuth where('creador').equals(req.usuario)
    //console.log(req.usuario);
   const proyectos = await Proyecto.find()
                                   .where('creador')
                                    .equals(req.usuario)
                                    .select("-tareas");
   //console.log(proyectos);
   res.json(proyectos)
};

const nuevoProyecto = async (req, res) =>{
    //console.log(req.body);
    //console.log(req.usuario)
    //instanciar Proyecto - importar modelo
    const proyecto = new Proyecto(req.body)
    //Asignar creador
    proyecto.creador = req.usuario._id

    try {
        const proyectoAlmacenado = await proyecto.save()
        res.json(proyectoAlmacenado)
    } catch (error) {
        console.log(error);
    }
};

//Lista proyecto y tareas asociada a el
const obtenerProyecto = async (req, res) =>{

    //routing dinamico obtener ID
    const {id} = req.params;
    //comprobamos que el proyecto exista - y tarea las tareas del proyecto 
    const proyecto = await Proyecto.findById(id).populate("tareas")
    //console.log(proyecto);
    if (!proyecto) {
        const error = new Error('Proyecto no encontrado')
        return res.status(404).json( {msg:error.message})      
    }

    //comprobar que la persona que quiere ver el proyecto es quien lo creo
    //console.log(proyecto.creador.toString() === req.usuario._id.toString() );
    if (proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error('Acción no válida')
        return res.status(401).json( {msg:error.message}) 
    }

    //OBTENER LAS TAREAS DEL PROYECTO======================================
    const tareas = await Tarea.find().where("proyecto").equals(proyecto._id)
        
    res.json({
            proyecto,
            tareas,
        });
    //OBTENER LAS TAREAS DEL PROYECTO=========================

    //mostrar proyecto a quien lo creo
    // res.json(proyecto)
}; 
 
const editarProyecto = async (req, res) =>{
     //routing dinamico obtener ID
     const {id} = req.params;   //obtener el proyecto 
     const proyecto = await Proyecto.findById(id)  //instancia del proyecto

     if (!proyecto) { //verificar que existe el proyecto
         const error = new Error('Proyecto no encontrado')
         return res.status(404).json( {msg:error.message})      
     }   
     if (proyecto.creador.toString() !== req.usuario._id.toString()) {
         const error = new Error('Acción no válida')
         return res.status(401).json( {msg:error.message});
     }
     //pasa validaciones para entrar a esta parte
     //reescribir proyecto  ( !! xxxx lo que ya hay en la bd)
     proyecto.nombre = req.body.nombre || proyecto.nombre;
     proyecto.descripcion = req.body.descripcion || proyecto.descripcion;
     proyecto.fechaEntrega = req.body.fechaEntrega || proyecto.fechaEntrega;
     proyecto.cliente = req.body.cliente || proyecto.cliente;
 
     try {
        const proyectoAlmacenado = await proyecto.save();
        res.json(proyectoAlmacenado)
     } catch (error) {
         console.log(error);
     }
};

const eliminarProyecto = async (req, res) =>{
     //routing dinamico obtener ID
     const {id} = req.params;   //obtener el proyecto - IDENTIFICARLO
     const proyecto = await Proyecto.findById(id)  //instancia del proyecto- COMSULTAR LA BD

     if (!proyecto) { //verificar que existe el proyecto
         const error = new Error('Proyecto no encontrado')
         return res.status(404).json( {msg:error.message})      
     }   
     if (proyecto.creador.toString() !== req.usuario._id.toString()) { //CREADOR CORRECTO?
         const error = new Error('Acción no válida')
         return res.status(401).json( {msg:error.message});
     }

     try {
        await proyecto.deleteOne();
        res.json( {msg: "Proyecto Eliminado"} )  
     } catch (error) {
        console.log(error);
     }
};

const agregarColaborador = async (req, res) =>{

};

const eliminarColaborador = async (req, res) =>{

};



export {
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyecto,
    eliminarProyecto,
    agregarColaborador,
    eliminarColaborador
   

};