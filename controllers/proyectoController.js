import Proyecto from "../models/Proyecto.js"


//Obtiene todos los proyectos del usuario autenticado
const obtenerProyectos = async (req, res) =>{
   
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

};

const editarProyecto = async (req, res) =>{

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