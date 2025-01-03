import { Router } from 'express';
import * as userController from '../controllers/userController'; // Importamos el controlador de tareas

const router = Router();

router.post('/', userController.createUser);
router.get('/:email', userController.getUser);

export default router;
