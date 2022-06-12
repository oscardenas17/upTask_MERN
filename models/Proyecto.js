import moongose from "mongoose";

const proyectoSchema = mongoose.Schema( {
    nombre: {
        type: String,
        trim: true,
        required: true,
    },
    descripcion: {
        type: String,
        trim: true,
        required: true,
    },
    fechaEntrega: {
        type: Date,
        default: Date.now(),
    },
    cliente: {
        type: String,
        trim: true,
        required: true
    },
    creador: {
        type: moongose.Schema.Types.ObjectId
    }

});