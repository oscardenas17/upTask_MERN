import nodemailer from 'nodemailer'

//datos = mail, token, y nombre usuario
export const emailRegistro =  async(datos) =>{
    //console.log('Datos', datos);
    const {email, nombre, token} = datos

    const transport = nodemailer.createTransport({
       host: process.env.EMAIL_HOST,
       port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
      });

      //Información del email
      const info = await transport.sendMail({
        from: ' "Administrador Uptask" <cuentas@uptask.com> ',
        to: email,
        subject: "Comprueba tu cuenta",
        text: "Comprueba tu cuenta",
        html: `
            <p style="font-size: 12px;">Hola: ${nombre }, ya puedes comprobar tu cuenta</p>
            <p>Tu cuenta ya esta casi lista, compruebala en el siguiente enlace: </p>


            <a  href=" ${process.env.FRONTEND_URL}/confirmar/${token} "> Comprobar Cuenta </a>


            <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
        `
      })
}

//recuperar contraseña envio de mail 
export const emailOlvidePassword =  async(datos) =>{
  //console.log('Datos', datos);
  const {email, nombre, token} = datos

  const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    //TODO:mover hacia hacia variables de entorno
    //Información del email
    const info = await transport.sendMail({
      from: ' "Administrador Uptask" <cuentas@uptask.com> ',
      to: email,
      subject: "Reestablece tu password",
      text: "Reestablece tu password",
      html: `
          <p style="font-size: 12px;">Hola: ${nombre }, has solicitado reestablecer tu contraseña</p>
          <p>Ingresa tu nueva contraseña en el siguiente enlace: </p>


          <a  href=" ${process.env.FRONTEND_URL}/olvide-password/${token} "> Reestablece tu contraseña</a>


          <p>Si tu no solicitaste este procedimiento, puedes ignorar el mensaje</p>
      `
    })
}