import nodemailer from 'nodemailer'

//datos = mail, token, y nombre usuario
export const emailRegistro =  async(datos) =>{
    //console.log('Datos', datos);
    const {email, nombre, token} = datos

    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "b8f82a8e89f9af",
          pass: "a6e9592afca0c3"
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