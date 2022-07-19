import Proyecto from "../models/Proyecto.js";
import Tarea from "../models/Tarea.js";



const agregarTarea = async (req,res) =>{
    const {proyecto} = req.body;

    //Comprobar si el proyecto existe para añadirle la tarea
    const existeProyecto =await Proyecto.findById(proyecto);
    //console.log(existeProyecto);

    if(!existeProyecto){
        const error = new Error("El proyecto no existe.");
        return res.status(404).json({msg:error.message});
    }

    //Comprobar si la persona que añadio la tarea fue quien creo el proyecto
    if(existeProyecto.creador.toString() !==  req.usuario._id.toString()){
        const error = new Error("No tienes los permisos para añadir tareas");
        return res.status(403).json({msg:error.message});
    }


    try {
        const tareaAlmacenada = await Tarea.create(req.body)
        return res.json(tareaAlmacenada);
    } catch (error) {
        console.log(error);
    }
};


//obtener una tarea de la persona autenticada y que haya creado el proyecto
const obtenerTarea = async (req,res) =>{
    
    //Obtener el id de la tarea
    const {id} = req.params;
    //console.log(id);
    //Identidicar la tarea, con populate cruzamos la info de proyecto para encontrar el creador del proyecto
    const tarea = await Tarea.findById(id).populate("proyecto");
    //console.log(tarea); 

    if(!tarea){
        const error = new Error("tarea no encontrada");
        return res.status(404).json({msg:error.message});
    }


    if(tarea.proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error("Acción no válida");
        return res.status(403).json({msg:error.message});
    }


}



const actualizarTarea = async (req,res) =>{
    
};


const eliminarTarea = async (req,res) =>{
    
};


const cambiarEstado = async (req,res) =>{
    
};


export {
    agregarTarea,
    obtenerTarea,
    actualizarTarea,
    eliminarTarea,
    cambiarEstado

}