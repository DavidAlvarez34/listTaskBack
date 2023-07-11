import generarId from '../helpers/generarId.js';
import generarJWT from '../helpers/generarJWT.js';
import Usuario from '../models/user.js';
export const registrar = async(req,res)=>{
    //Evitar registros duplicados
    const {email} = req.body;
    //comprueba si existe el usuario
    const existeUsuario = await Usuario.findOne({email});
    if(existeUsuario){
        const error = new Error("Usuario ya registrado");
        return res.status(400).json({msg : error.message})
    }

    try {
        console.log(req.body);
        
        //crear una instacia
        const usuario = new Usuario(req.body);
        //generar diferentes tokens a los usuarios para confirmalos y poner true
        usuario.token = generarId();
        await usuario.save();
        res.json({msg:'Usuario Creado Correctamente, Revisa tu Email para Confirmar tu Cuenta'});
    } catch (error) {
        console.log(error);
    }
   
    
}

export const autenticar =async(req,res)=>{
    const {email,password} = req.body;

    //comprobar si el usuario existe
    const usuario = await Usuario.findOne({email});
    if(!usuario){
        const error = new Error('El usuario no existe');
        return res.status(404).json({msg: error.message});
    }
    //Comprobar si el usuario esta confirmado
    if(!usuario.confirmado){
        const error = new Error('Tu Cuenta no ha sido confirmada');
        return res.status(404).json({msg: error.message});
    }
    //Comprobar su password
    if(await usuario.comprobarPassword(password)){
        res.json({
            _id:usuario._id,
            nombre:usuario.nombre,
            email:usuario.email,
            token: generarJWT(usuario._id),
        })
    } else{
        const error = new Error('El Password es Incorrecto');
        return res.status(403).json({msg: error.message});
    }
}

export const confirmar = async (req,res) =>{
    const { token } = req.params;
    const usuarioConfirmar = await Usuario.findOne({token});
    if(!usuarioConfirmar){
        const error = new Error('Token no válido');
        return res.status(403).json({msg: error.message});
    }
    try {
        //cambiar a true
        usuarioConfirmar.confirmado = true;
        usuarioConfirmar.token ='';
        await usuarioConfirmar.save();
        res.json({msg:'Usuario Confirmado Correctamente'});
    } catch (error) {
        res.json({})
    }
    
}

export const olvidePassword = async (req,res) => {
    const { email } = req.body;
    console.log("hola", email);
    //comprobar si el usuario existe
    const usuario = await Usuario.findOne({email});
    if(!usuario){
        const error = new Error('El usuario no existe');
        return res.status(404).json({msg: error.message});
    }
    try {
        usuario.token = generarId()
        await usuario.save();
        res.json({msg:"Hemos enviado un email con las instrucciones"})
    } catch (error) {
        
    }
}
export const comprobarToken = async(req, res) =>{
    const { token } = req.params;
    const tokenValido = await Usuario.findOne({token});
    if(tokenValido) {
        res.json({msg:"Token valido"})
    }else {
        const error = new Error('Token no valido');
        return res.status(404).json({msg: error.message});
    }
}

export const nuevoPassword = async(req,res) =>{
    const { token } = req.params;
    const { password } = req.body;
    const usuario = await Usuario.findOne({token});
    if(usuario) {
        //guardar la nueva contraseña
        usuario.password = password;
        //cambiar el token a vacio para mayor segurida7
        usuario.token = '';
        try {
            await usuario.save();
            res.json({ msg: 'Password Modificado Correctamente' });
        } catch (error) {
            console.log(error);
        }
        
       
    }else {
        const error = new Error('Token no valido');
        return res.status(404).json({msg: error.message});
    }

}
export const perfil = (req,res) => {
    const { usuario } = req;
    res.json(usuario);
}