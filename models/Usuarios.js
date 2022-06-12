import mongoose from "mongoose";
import  bcrypt  from "bcrypt"; 

const usuarioSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      // requerido
      required: true,
      //trim de espacios
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
    //   trim: true,
      unique: true,
    },
    token: {
      type: String,
    },
    confirmado: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

//Con pre se ejecuta el sig code antes de guardar en la bd
usuarioSchema.pre('save', async function(next) {

  //Si no esta modificando password- next - al siguiente middleware
  if(!this.isModified('password')){
    next()
  }

  const salt = await bcrypt.genSalt(10)

  this.password = await bcrypt.hash(this.password, salt)
} )

//definir modelo
const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;
