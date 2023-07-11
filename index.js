import express from 'express';
import dotenv from 'dotenv';
import conectDb from './config/db.js';
import cors from 'cors';
import UsuariosRoutes from './routes/UsuariosRoutes.js';
import proyectosRoutes from './routes/proyectoRoutes.js';
import tareaRoutes from './routes/tareaRoutes.js';

const app = express();
app.use(express.json());

dotenv.config();
conectDb();

//configurar cors para lista blanca
const whiteList = ['http://127.0.0.1:5173'];

const corsOptions ={
    origin:function(origin,callback) {

        console.log(origin);
        if (whiteList.includes(origin)) {
        //puede consultar la api
        callback(null,true)
        }else {
            callback( new Error('Error de Cors'))
        }
    }
}
app.use(cors(corsOptions));
app.use('/api/usuarios',UsuariosRoutes);
app.use('/api/proyectos',proyectosRoutes);
app.use('/api/tareas',tareaRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT,()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});