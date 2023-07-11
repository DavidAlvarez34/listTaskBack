import Proyecto from "../models/Proyecto.js";
import Tarea from "../models/Tarea.js";
const obtenerProyectos = async (req, res) => {
    //where: una condicional
    //equals: que sea igual
    const proyectos = await Proyecto.find().where('creador').equals(req.usuario);//que el creador sea el mismo en el proyecto
    res.json(proyectos);
}
const nuevoProyecto = async (req, res) => {
    const proyecto = new Proyecto(req.body);
    proyecto.creador = req.usuario._id;
    console.log(req.body);
    console.log(req.usuario);
    try {
        const proyectoAlmacenado = await proyecto.save();
        res.json(proyectoAlmacenado);
    } catch (error) {
        console.log(error);
    }
}
const obtenerProyecto = async (req, res) => {
    const {id} = req.params;
    const proyecto = await Proyecto.findById(id);
    if(!proyecto) {
        const error = new Error("No encontrado");
        return res.status(404).json({msg : error.message});
    }
    //comprobar si el creador es el que creo el proyecto
    if(proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error("Accion no valida");

        return res.status(401).json({msg: error.message});
    }
    //Obtener las tareas del proyecto
    const tareas = await Tarea.find().where("proyecto").equals(proyecto._id);
    res.json({proyecto,tareas});
    //return res.json(proyecto)
}
const editarProyecto = async (req, res) => {
    const {id} = req.params;
    const proyecto = await Proyecto.findById(id);
    if(!proyecto) {
        const error = new Error("No encontrado");
        return res.status(404).json({msg : error.message});
    }
    //comprobar si el creador es el que creo el proyecto
    if(proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error("Accion no valida");

        return res.status(401).json({msg: error});
    }
    proyecto.nombre = req.body.nombre || proyecto.nombre;
    proyecto.descripcion = req.body.descripcion || proyecto.descripcion;
    proyecto.fechaEntrega = req.body.fechaEntrega || proyecto.fechaEntrega;
    proyecto.cliente = req.body.cliente || proyecto.cliente;

    try {
        const proyectoAlmacenado = await proyecto.save();
        res.json(proyectoAlmacenado)

    } catch (error) {
        console.log(error);
    }
}
const eliminarProyecto = async (req, res) => {
    const {id} = req.params;
    const proyecto = await Proyecto.findById(id);
    if(!proyecto) {
        const error = new Error("No encontrado");
        return res.status(404).json({msg : error.message});
    }
    //comprobar si el creador es el que creo el proyecto
    if(proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error("Accion no valida");

        return res.status(401).json({msg: error});
    }
    try {
        await proyecto.deleteOne();
        res.json({msg:'Proyecto Eliminado'})
    } catch (error) {
        console.log(error);
    }
}
const agregarColaborador = async (req,res) => {}
const eliminarColaborador = async (req, res) => {}
//const obtenerTareas = async (req, res) => {
   /* const { id } = req.params;
    const existeProyecto = await Proyecto.findById(id);
    if (!existeProyecto) {
        const error = new Error("No encontrado");
        return res.status(404).json({msg : error.message});

    }*/

    //Se tiene que ser creador del proyecto o colaborador
   // const tareas = await Tarea.find().where("proyecto").equals(id);
    //res.json(tareas);
//}
export {
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyecto,
    eliminarProyecto,
    agregarColaborador,
    eliminarColaborador,
    //obtenerTareas,
}