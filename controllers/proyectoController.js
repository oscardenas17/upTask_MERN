import Proyecto from "../models/Proyecto.js"


//Obtiene todos los proyectos del usuario autenticado, no de otros
const obtenerProyectos = async (req, res) =>{
    //condicion para solo traer lo del usuario del req.usuario del checkAuth where('creador').equals(req.usuario)
    //console.log(req.usuario);
   const proyectos = await Proyecto.find().where('creador').equals(req.usuario);
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
    //console.log(id);
    const proyecto = await Proyecto.findById(id)
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
    //mostrar proyecto a quien lo creo
    res.json(proyecto)
}; 
 
const editarProyecto = async (req, res) =>{
     //routing dinamico obtener ID
     const {id} = req.params;   
     const proyecto = await Proyecto.findById(id)     
     if (!proyecto) {
         const error = new Error('Proyecto no encontrado')
         return res.status(404).json( {msg:error.message})      
     }   
     if (proyecto.creador.toString() !== req.usuario._id.toString()) {
         const error = new Error('Acción no válida')
         return res.status(401).json( {msg:error.message});
     }
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

};

const agregarColaborador = async (req, res) =>{

};

const eliminarColaborador = async (req, res) =>{

};

const obtenerTareas = async (req, res) =>{

};

export {
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyecto,
    eliminarProyecto,
    agregarColaborador,
    eliminarColaborador,
    obtenerTareas

};