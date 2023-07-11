import jwt from 'jsonwebtoken';
//se puede actualizar cada 5 minutos o cada 30 dias
const generarJWT = (id) => {
    return jwt.sign(
        {
           id
        },
        process.env.JWT_SECRET,
        {//Espiracion en
            expiresIn: '30d',
        }
    )
}
export default generarJWT;