import jwt from 'jsonwebtoken';
import Usuario from '../models/user.js';
const checkAuth = async(req, res, next) => {
    //console.log(req.headers.authorization);
    let token;
    if(//comprobar si esta el token
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ){
        
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
           //comparar el id usuario
           //select: omitir campos a mostrar
            req.usuario = await Usuario.findById(decoded.id).select("-password -confirmado -token -createdAt -updatedAt -__v");
            //console.log(req.usuario);

            return next();
        } catch (error) {
            return res.status(404).json({msg:'Hubo un error'});
        }
    }
    if(!token) {
        const error = new Error('Token no valido');
       return res.status(401).json({msg:error.message});
    }
    next()
}
export default checkAuth;