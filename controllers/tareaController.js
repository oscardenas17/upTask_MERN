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
        return res.status(404).json({msg:error.message});
    }


    try {
        const tareaAlmacenada = await Tarea.create(req.body)
        return res.json(tareaAlmacenada);
    } catch (error) {
        console.log(error);
    }
};

const obtenerTarea = async (req,res) =>{
    
};


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
    cambiarEstado,

};