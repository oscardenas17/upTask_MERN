//importar la libreria de JWT para realizar el decoded
import jwt from "jsonwebtoken";
//Importar modelo usuario
import Usuario from "../models/Usuarios.js";

//Validar que el JWT valido, existe, enviado via header?
const checkAuth =  async(req, res, next) => {
    //console.log('desde checkAuth.js');
    //console.log(req.headers.authorization);
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        try {
            //SPLIT con vacio PARA DIVIDIR EN CADENAS EL BEARER Y EL TOKEN Y OBTENER EL TOKEN
            token= req.headers.authorization.split(' ')[1]
            //console.log(token);
            //Descrifar- leer token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            //console.log(decoded);

            //Se busca usuario por ID y se asigna la info en req.usuario con el perfil del usuario, se tiene la sesion del usuario con la que se puede acceder desde controladores u otros lugares de la app
            // .select para omitir la info del pass
            req.usuario = await Usuario.findById(decoded.id).select( "-password -confirmado -token -createdAt -updatedAt -__v")
            //console.log(req.usuario);
            
            // una vez asignado al request el JWT ir al siguiente middleware
            return next()

        } catch (error) {
            return res.status(404).json( {msg: 'Error con el token en la autenticación'} )
        }
    }

    //El usuario no envia Token
    if (!token) {
        const error = new Error("Token no válido, no ha sido enviado");
        res.status(401).json( {msg: error.message} )
    }


    next();//con esto lo definido en las rutas, hace el Check y luego ejecuta perfil

};


export default checkAuth
//importar middleware en usuariosRoutes