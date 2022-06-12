import Usuario from "../models/Usuarios.js";
import generarId from "../helpers/generarId.js"


const registrar = async (req,res)=>{
    //console.log(req.body);
    //Evitar registro mail duplicado
    const {email} = req.body
    const existeUsuario = await Usuario.findOne( {email} )
    console.log('existe usuario');

    if(existeUsuario){
        const error = new Error('Email ya registrado');
        return res.status(400).json( {msg:error.message} )
    }

    try {
        //console.log(usuario);
        const usuario = new Usuario(req.body)
        usuario.token = generarId()
        const usuarioAlmacenado = await usuario.save()
        res.json( {usuarioAlmacenado} )
        
    } catch (error) {
        console.log(error)
    }
   
  
} ;


export {
    registrar


}


