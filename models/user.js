import mongoose from "mongoose";
import bcrypt from "bcrypt";//encriptar usuarios
const userSchema = mongoose.Schema({

    nombre:{
        type:String,
        require:true,
        trim:true//quita espacios de al principio y al final
    },
    password:{
        type:String,
        require:true,
        trim: true
    },
    email: {
        type:String,
        require: true,
        trim:true,
        unique: true // que sea un correo unico y que no se pueda repetir
    },
    token : {
        type:String
    },
    confirmado: {
        type: Boolean,
        default: false
    }},
    {
        //creado fecha de creado y actualizado
        timestamps: true
    });
//antes de guardar has esto
//Function hace referencia a this
userSchema.pre('save',async function(next){
    //si no esta modificando el password no hagas nada
    if(!this.isModified("password")){
        next();//siguiente middleware
    }
    //generar la salt
    const salt = await bcrypt.genSalt(10);
    //generar la encriptacion del pass
    this.password = await bcrypt.hash(this.password,salt);
});
//uso del contexto del this
userSchema.methods.comprobarPassword = async function(passwordFormulario){
    //comparar la contraseña del formulario es correcta
    return await bcrypt.compare(passwordFormulario, this.password);//retorna true false
}
const Usuario = mongoose.model('Usuario',userSchema);
export default Usuario;
