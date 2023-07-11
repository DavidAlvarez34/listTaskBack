//generar un id unico
//Es para el regitro del usuario
const generarId=()=>{
    //random: generar numeros
    //toString:generar letras aletorias
    //subString(2): quitar los 2 primeros caracteres
    //Date.now(): da la fecha en formato de numeros
    const random= Math.random().toString(32).substring(2);
    const fecha = Date.now().toString(32);
    return random + fecha;
}
export default generarId;