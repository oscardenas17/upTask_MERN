import Usuario from "../models/Usuarios.js";
import generarId from "../helpers/generarId.js"
import generarJWT from "../helpers/generarJWT.js"



//Crear usuario
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



//Autenticar usuario
const autenticar = async (req,res) =>{
    const {email, password} = req.body
    //Comprobar si el usuario existe
    const usuario =  await Usuario.findOne( {email} )
    if(!usuario){
        const error = new Error('EL usuario no existe')
        return res.status(404).json( {msg:error.message})
    }
    //Comprobar si el usuario esta confirmado
    if(!usuario.confirmado){
        const error = new Error('Tu cuenta no ha sido confirmada')
        return res.status(403).json( {msg:error.message})
    }
    //Comprobar password
    if (await usuario.comprobarPassword(password)  ) {
        //console.log('es correcto');
        //se retorna obj info del usuario correcto
        res.json({
            _id: usuario._id,
            nombre:usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario._id),
        })

    }else{
        const error = new Error('Contraseña Incorrecta')
        return res.status(404).json( {msg:error.message})
    }
};


//Confirmar cuenta usuario
const confirmar = async(req,res) =>{
//console.log(req.params.token);
    //Leer de la url el token
    const {token} = req.params
    const usuarioConfirmar = await Usuario.findOne( {token} ); //Buscar el usuario con ese token
    //Token invalido
    if (!usuarioConfirmar) {
        const error = new Error('Token no válido')
            return res.status(404).json( {msg:error.message})    
    }
    //token ok 
    try {
        usuarioConfirmar.confirmado= true;
        usuarioConfirmar.token= "";  //eliminar token un solo uso                    
        //almacenar en bd
        await usuarioConfirmar.save();
        res.json( {msg: 'Usuario Confirmado Correctamente'})
    } catch (error) {
        console.log(error);
    }// console.log(usuarioConfirmar);
};


//Recuperación de contaseñas

const olvidePassword = async(req,res) => {
    const {email} = req.body;
     //Comprobar si el usuario existe
     const usuario =  await Usuario.findOne( {email} )
     if(!usuario){
         const error = new Error('EL usuario no existe')
         return res.status(404).json( {msg:error.message})
     }

     try {
        usuario.token = generarId();
        await usuario.save();
        res.json( {msg: 'Email con instrucciones enviado'})
        //console.log(usuario);
     } catch (error) {
        console.log(error);
     }
};





export {
    registrar,
    autenticar,
    confirmar,
    olvidePassword


}


