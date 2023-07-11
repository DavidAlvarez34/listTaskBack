import express from 'express';
import { autenticar, confirmar, registrar, olvidePassword ,comprobarToken, nuevoPassword, perfil } from '../controllers/userControllers.js';
import checkAuth from '../middleware/checkAuth.js';
const router=express.Router()

router.post('/',registrar);
router.post('/login',autenticar);
router.get('/confirmar/:token',confirmar);
router.post('/olvide-password',olvidePassword);
//utilizar 2 mismas rutas con 2 metodos diferentes
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword);
router.get('/perfil',checkAuth,perfil);
export default router;