import { Router } from 'express';
import * as taskController from '../controllers/taskController'; // Importamos el controlador de tareas
import verifyToken  from '../middlewares/verifyToken';

const router = Router();

// Ruta para obtener todas las tareas
router.get('/', verifyToken, taskController.getTasks);

// Ruta para crear una nueva tarea
router.post('/', verifyToken, taskController.createTask);

// Ruta para actualizar una tarea existente
router.put('/:taskId', verifyToken, taskController.updateTask);

// Ruta para eliminar una tarea
router.delete('/:taskId', verifyToken, taskController.deleteTask);

export default router;
