import Usuario from "../models/Usuarios.js";


const registrar = async (req,res)=>{
    //console.log(req.body);
    try {
        //console.log(usuario);
        const usuario = new Usuario(req.body)
        const usuarioAlmacenado = await usuario.save()
        res.json( {usuarioAlmacenado} )
        
    } catch (error) {
        console.log(error)
    }
   
  
} ;


export {
    registrar


}


