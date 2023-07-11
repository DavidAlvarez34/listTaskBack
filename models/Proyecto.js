import mongoose from "mongoose";

const proyectosSchema = mongoose.Schema({
    nombre: {
        type:String,
        //Eliminar espacios
        trim: true,
        required: true
    },
    descripcion:{
        type:String,
        //Eliminar espacios
        trim: true,
        required: true
    },
    fechaEntrega: {
        type:Date,
        default: Date.now(),
    },
    cliente: {
        type:String,
        //Eliminar espacios
        trim: true,
        required: true
    },
    creador:{
        //va a hacer referencia al id del usuario registrado
        type:mongoose.Schema.Types.ObjectId,
        ref:'Usuario',//Nombre del esquema para obtener la referencia
    },
    colaboradores:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Usuario",
        }
    
    ]
},
{
    timestamps: true,
}
);

const Proyecto = mongoose.model("Proyecto", proyectosSchema);
export default Proyecto;